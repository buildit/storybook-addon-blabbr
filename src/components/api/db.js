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
}).on('paused', function (err) {
  // replication paused (e.g. replication up to date, user went offline)
  // let data = {
  //   isOnline: false,
  //   statusEvent: true,
  //   msg: err
  // };
  // console.log('PAUSED fired!',err);
  // fireListeners('online', data);
}).on('active', function () {
  // replicate resumed (e.g. new changes replicating, user went back online)
  // let data = {
  //   isOnline: true,
  //   statusEvent: true
  // };
  // console.log('ACTIVE fired!');
  // fireListeners('online', data);
}).on('change', function (info) {
  // handle change
  console.log('CHANGE fired!');
}).on('denied', function (err) {
//   // a document failed to replicate (e.g. due to permissions)
  console.log('DENIED fired!', err);
//   dbEmitter.emit('denied', err);
}).on('complete', function (info) {
//   // handle complete
//   dbEmitter.emit('complete', info);
  console.log('COMPLETE fired!', info);
}).on('error', function (err) {
   // handle error
//   dbEmitter.emit('error', err);
  console.log('ERROR fired!', err);
});

function updateIndicator() {
	// Show a different icon based on offline/online
  let data = {
    isOnline: navigator.online,
    statusEvent: true
  };
  fireListeners('online', data);
}

// Update the online status icon based on connectivity
window.addEventListener('online',  updateIndicator);
window.addEventListener('offline', updateIndicator);


const dbEvents = {
  change: [],
  online: [],
  denied: [],
  complete: [],
  error: [],
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
// TODO - add other event types to listen e.g. error etc.

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
};

export default db;
