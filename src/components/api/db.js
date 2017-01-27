// Initialize PouchDB
import PouchDB from 'pouchdb-browser';
import * as pouchDBFind from 'pouchdb-find';
import * as config from '../../config/db';

const user = config;

PouchDB.plugin(pouchDBFind);

// enable debugging
PouchDB.debug.enable('pouchdb:find')

const db = new PouchDB(`https://${user.user}:${user.pwd}@jonathan-ec.cloudant.com/blabbr`);

db.createIndex({
  index: {
    fields: ['componentId', 'timestamp']
  }
});

export default db;
