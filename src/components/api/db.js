// Initialize Firebase
import * as firebase from 'firebase';
import config from '../../../config/db';

firebase.initializeApp(config);
const db = firebase.database();

export default db;
