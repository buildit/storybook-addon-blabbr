import getConfig from './getConfig';

const resolveValue = item => {
  if (item) {
    return Promise.resolve(item);
  } else {
    return Promise.resolve(null);
  }
};

const db = () => {
  try {
    return getConfig().then(config => resolveValue(config.blabbr.db));
  } catch (error) {
    return Promise.reject(new Error('Could not find config value for DB.'));
  }
};

const slack = () => {
  try {
    return getConfig().then(config => resolveValue(config.blabbr.slack));
  } catch (error) {
    return Promise.reject(new Error('Could not find config value for Slack.'));
  }
};

const ui = () => {
  try {
    return getConfig().then(config => resolveValue(config.blabbr.ui));
  } catch (error) {
    return Promise.reject(new Error('Could not find config value for UI.'));
  }
};

const versions = () => {
  try {
    return getConfig().then(config => resolveValue(config.versions));
  } catch (error) {
    return Promise.reject(
      new Error('Could not find config value for Versions.')
    );
  }
};

export { db, slack, ui, versions };
