let configFile = null;

const getConfig = () => {
  const p = new Promise((resolve, reject) => {
    if (configFile) {
      resolve(configFile);
    } else if (window && window.parent) {
      const url = window.parent.location;
      const location = `${url.protocol}//${url.hostname}:${url.port}/storybook-config.json`;

      fetch(location).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            if (data.storybook && data.storybook) {
              configFile = data.storybook;
              resolve(configFile);
            } else {
              reject('Invalid config');
            }
          });
        }
      }).catch(() => {
        reject('Error getting config');
      });
    } else {
      reject('Window not found');
    }
  });
  return p;
};

const dbConfig = () => {
  const p = new Promise((resolve, reject) => {
    getConfig().then((response) => {
      if (response.blabbr && response.blabbr.db) {
        resolve(response.blabbr.db);
      } else {
        resolve(null);
      }
    }).catch((response) => {
      reject(response);
    });
  });
  return p;
};

const slack = () => {
  const p = new Promise((resolve, reject) => {
    getConfig().then((response) => {
      if (response.blabbr && response.blabbr.slack) {
        resolve(response.blabbr.slack);
      } else {
        resolve(null);
      }
    }).catch((response) => {
      reject(response);
    });
  });
  return p;
};

const ui = () => {
  const p = new Promise((resolve, reject) => {
    getConfig().then((response) => {
      if (response.blabbr && response.blabbr.ui) {
        resolve(response.blabbr.ui);
      } else {
        resolve(null);
      }
    }).catch((response) => {
      reject(response);
    });
  });
  return p;
};

const versions = () => {
  const p = new Promise((resolve, reject) => {
    getConfig().then((response) => {
      if (response.versions) {
        resolve(response.versions);
      } else {
        resolve(null);
      }
    }).catch((response) => {
      reject(response);
    });
  });
  return p;
};

export { dbConfig, slack, ui, versions };
