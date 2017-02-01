// Initialize PouchDB
import PouchDB from 'pouchdb-browser';
import * as pouchDBFind from 'pouchdb-find';
import config from 'blabbr-config/db'; // eslint-disable-line
import { EventEmitter } from 'events';

PouchDB.plugin(pouchDBFind);

// enable debugging
PouchDB.debug.enable('pouchdb:find');

const db = new PouchDB('blabbr');

const dbEmitter = new EventEmitter();

db.createIndex({
  index: {
    fields: ['componentId', 'timestamp'],
  },
});

db.sync(`https://${config.user}:${config.pwd}@${config.host}`, {
  live: true,
  retry: true
});

function updateIndicator() {
	// Show a different icon based on offline/online
  let data = {
    isOnline: navigator.onLine,
    statusEvent: true
  };
  fireListeners('online', data);
}

function addOnlineListener() {
  // Update the online status icon based on connectivity
  window.addEventListener('online',  updateIndicator, false);
  window.addEventListener('offline', updateIndicator, false);
}

function removeOnlineListener() {
  window.removeEventListener('online', updateIndicator, false);
  window.removeEventListener('offline', updateIndicator, false);
}

const dbEvents = {
  change: [],
  online: [],
  error: []
};

dbEmitter.on('change', (data) => {
  fireListeners('change', data);
});

const fireListeners = (eventType, data) => {
  let changedDoc = {
      eventName: ''
    },
    componentId,
    stateId,
    eventData,
    isStatusEvent = !!data.statusEvent;

  if (eventType === 'change') {
    changedDoc = data.doc;
  }

  // fire any listeners passing through data
  for (let i = 0, l = dbEvents[eventType].length; i < l; i++) {
    eventData = dbEvents[eventType][i];

    if ((eventData.eventName === changedDoc.eventName ||
      isStatusEvent === true) &&
      eventData.listener) {
      eventData.listener(data);
    }
  }
};

const subscribe = (eventType, eventName, listener) => {
  if (!dbEvents[eventType]) {
    return "No such event type, please use 'change'/'online'/'denied'/'complete'/'error'";
  }
  let eventId = `${eventType}${eventName}`,
    eventListener = null;

  if (eventType === 'change') {
    eventListener = db.changes({
      since: 'now',
      live: true,
      include_docs: true,
      filter: function (doc) {
        return doc.eventName === eventName;
      }
    }).on('change', (data) => {
      dbEmitter.emit('change', data);
    }).on('error', (err) => {
      dbEmitter.emit('error', err);
    });
  }

  dbEvents[eventType].push({ "eventId": eventId, eventListener, eventName, listener });

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
        dbEvents[eventType][i].eventListener && dbEvents[eventType][i].eventListener.cancel();
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
