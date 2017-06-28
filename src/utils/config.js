import getConfig from './getConfig';

const resolveValue = item =>
  item ? Promise.resolve(item) : Promise.resolve(null);

const db = () => {
  return getConfig()
    .then(config => resolveValue(config.blabbr.db))
    .catch(error =>
      Promise.reject(new Error('Could not find config value for DB.'))
    );
};

const slack = () => {
  return getConfig()
    .then(config => resolveValue(config.blabbr.slack))
    .catch(error =>
      Promise.reject(new Error('Could not find config value for Slack.'))
    );
};

const ui = () => {
  return getConfig()
    .then(config => resolveValue(config.blabbr.ui))
    .catch(error =>
      Promise.reject(new Error('Could not find config value for UI.'))
    );
};

const versions = () => {
  return getConfig()
    .then(config => resolveValue(config.versions))
    .catch(error =>
      Promise.reject(new Error('Could not find config value for Versions.'))
    );
};

export { db, slack, ui, versions };
