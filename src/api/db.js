// Initialize PouchDB
import PouchDB from 'pouchdb-browser';
import * as pouchDBFind from 'pouchdb-find';
import { EventEmitter } from 'events';
import { dbConfig } from '../utils/config'; // eslint-disable-line

PouchDB.plugin(pouchDBFind);

// enable debugging
PouchDB.debug.enable('pouchdb:find');

const db = new PouchDB('blabbr');

const dbEmitter = new EventEmitter();

db.createIndex({
  index: {
    fields: ['componentId', 'timestamp', 'version']
  }
});

dbConfig()
  .then(response => {
    if (response.host.includes('localhost')) {
      db.sync(`http://${response.host}`, {
        live: true,
        retry: true
      });
    } else {
      db.sync(`https://${response.user}:${response.pwd}@${response.host}`, {
        live: true,
        retry: true
      });
    }
  })
  .catch(response => {
    console.log(response);
  });

const dbEvents = {
  change: [],
  online: [],
  error: []
};

const fireListeners = (eventType, data) => {
  let changedDoc = {
    eventName: ''
  };
  let eventData;
  const isStatusEvent = !!data.statusEvent;

  if (eventType === 'change') {
    changedDoc = data.doc;
  }

  // fire any listeners passing through data
  for (let i = 0, l = dbEvents[eventType].length; i < l; i++) {
    eventData = dbEvents[eventType][i];

    if (
      (eventData.eventName === changedDoc.eventName ||
        isStatusEvent === true) &&
      eventData.listener
    ) {
      eventData.listener(data);
    }
  }
};

function updateIndicator() {
  // Show a different icon based on offline/online
  const data = {
    isOnline: navigator.onLine,
    statusEvent: true
  };
  fireListeners('online', data);
}

function addOnlineListener() {
  // Update the online status icon based on connectivity
  window.addEventListener('online', updateIndicator, false);
  window.addEventListener('offline', updateIndicator, false);
}

function removeOnlineListener() {
  window.removeEventListener('online', updateIndicator, false);
  window.removeEventListener('offline', updateIndicator, false);
}

dbEmitter.on('change', data => {
  fireListeners('change', data);
});

const subscribe = (eventType, eventName, listener) => {
  if (!dbEvents[eventType]) {
    return "No such event type, please use 'change'/'online'/'denied'/'complete'/'error'";
  }
  const eventId = `${eventType}${eventName}`;
  let eventListener = null;

  if (eventType === 'change') {
    eventListener = db
      .changes({
        since: 'now',
        live: true,
        include_docs: true,
        filter(doc) {
          return doc.eventName === eventName;
        }
      })
      .on('change', data => {
        dbEmitter.emit('change', data);
      })
      .on('error', err => {
        dbEmitter.emit('error', err);
      });
  }

  dbEvents[eventType].push({ eventId, eventListener, eventName, listener });

  // unique id returned
  return eventId;
};

const unsubscribe = (eventType, eventId) => {
  if (!dbEvents[eventType]) {
    return "No such event type, plesae use 'change'/'active'/'denied'/'complete'/'error'";
  }
  let eventRemoved = false;

  if (dbEvents[eventType]) {
    for (let i = 0, l = dbEvents[eventType].length; i < l; i++) {
      if (dbEvents[eventType][i].eventId === eventId) {
        if (dbEvents[eventType][i].eventListener) {
          dbEvents[eventType][i].eventListener.cancel();
          dbEvents[eventType][i].eventListener.removeAllListeners('change');
          dbEvents[eventType][i].eventListener.removeAllListeners('error');
          dbEvents[eventType][i].eventListener = null;
        }
        dbEvents[eventType].splice(i, 1);
        eventRemoved = true;
        break;
      }
    }
  }
  return eventRemoved;
};

export const dbEventManager = {
  subscribe,
  unsubscribe,
  addOnlineListener,
  removeOnlineListener
};

export default db;
