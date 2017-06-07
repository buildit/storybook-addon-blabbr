// Initialize PouchDB
import PouchDB from 'pouchdb-browser';
import * as pouchDBFind from 'pouchdb-find';
import { dbConfig } from '../../utils/config'; // eslint-disable-line
import { EventEmitter } from 'events';

PouchDB.plugin(pouchDBFind);

// enable debugging
PouchDB.debug.enable('pouchdb:find');

const db = new PouchDB('blabbr');

const dbEmitter = new EventEmitter();

db.createIndex({
  index: {
    fields: ['componentId', 'timestamp', 'version'],
  },
});

db.sync(`https://${dbConfig.user}:${dbConfig.pwd}@${dbConfig.host}`, {
  live: true,
  retry: true,
});

const dbEvents = {
  change: [],
  online: [],
  error: [],
};

const fireListeners = (eventType, data) => {
  let changedDoc = {
    eventName: '',
  };
  let eventData;
  const isStatusEvent = !!data.statusEvent;

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

function updateIndicator() {
  // Show a different icon based on offline/online
  const data = {
    isOnline: navigator.onLine,
    statusEvent: true,
  };
  fireListeners('online', data);
}

function addOnlineListener() {
console.log('adding online listener');
  // Update the online status icon based on connectivity
  window.addEventListener('online', updateIndicator, false);
  window.addEventListener('offline', updateIndicator, false);
}

function removeOnlineListener() {
console.log('removing online listener');
  window.removeEventListener('online', updateIndicator, false);
  window.removeEventListener('offline', updateIndicator, false);
}

dbEmitter.on('change', (data) => {
console.log('changechangechange');
  fireListeners('change', data);
});

const subscribe = (eventType, eventName, listener) => {
console.log('subscribing', eventType, eventName);
  if (!dbEvents[eventType]) {
    return "No such event type, please use 'change'/'online'/'denied'/'complete'/'error'";
  }
  const eventId = `${eventType}${eventName}`;
  let eventListener = null;

  if (eventType === 'change') {
    // eventListener = db.changes({
    //   since: 'now',
    //   live: true,
    //   include_docs: true,
    //   filter(doc) {
    //     return doc.eventName === eventName;
    //   },
    // }).on('change', (data) => {
    //   dbEmitter.emit('change', data);
    // }).on('error', (err) => {
    //   dbEmitter.emit('error', err);
    // });
  }

  dbEvents[eventType].push({ eventId, eventListener, eventName, listener });
console.log('events collection', dbEvents);
  // unique id returned
  return eventId;
};

const unsubscribe = (eventType, eventId) => {
  if (!dbEvents[eventType]) {
    return "No such event type, plesae use 'change'/'active'/'denied'/'complete'/'error'";
  }
  let eventRemoved = false;

  dbEvents[eventType] = dbEvents[eventType].filter((event) => {
    if (event.eventId === eventId) {
      // event.eventListener.cancel();
      // What were these for? Why isn't cancel good enough?
      // event.eventListener.removeAllListeners('change');
      // event.eventListener.removeAllListeners('error');
      return false;
    }

    return true;
  });

  return true;
};

export const dbEventManager = {
  subscribe,
  unsubscribe,
  addOnlineListener,
  removeOnlineListener,
};

export default db;
