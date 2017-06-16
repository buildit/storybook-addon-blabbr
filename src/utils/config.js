import getConfig from './getConfig';

const dbConfig = () =>
  new Promise((resolve, reject) => {
    getConfig()
      .then(response => {
        if (response.blabbr && response.blabbr.db) {
          resolve(response.blabbr.db);
        } else {
          resolve(null);
        }
      })
      .catch(response => {
        reject(response);
      });
  });

const slack = () =>
  new Promise((resolve, reject) => {
    getConfig()
      .then(response => {
        if (response.blabbr && response.blabbr.slack) {
          resolve(response.blabbr.slack);
        } else {
          resolve(null);
        }
      })
      .catch(response => {
        reject(response);
      });
  });

const ui = () =>
  new Promise((resolve, reject) => {
    getConfig()
      .then(response => {
        if (response.blabbr && response.blabbr.ui) {
          resolve(response.blabbr.ui);
        } else {
          resolve(null);
        }
      })
      .catch(response => {
        reject(response);
      });
  });

const versions = () =>
  new Promise((resolve, reject) => {
    getConfig()
      .then(response => {
        if (response.versions) {
          resolve(response.versions);
        } else {
          resolve(null);
        }
      })
      .catch(response => {
        reject(response);
      });
  });

export { dbConfig, slack, ui, versions };
