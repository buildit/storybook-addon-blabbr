const db = {
  user: '<YOUR_API_KEY>',
  pwd: '<YOUR_API_PASSWORD>',
  host: '<YOUR_HOST_NAME>',
};

const slack = {
  endPoint: '<YOUR_ENDPOINT>',
};

const ui = {
  avatar: true,
};

const version = require('../package.json').version;

export { db, slack, ui, version };
