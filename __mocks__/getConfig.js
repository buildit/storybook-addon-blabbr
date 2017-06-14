const configFile = require('../.storybook/storybook-config.json').storybook;

const getConfig = () =>
  new Promise(resolve => {
    resolve(configFile);
  });

export default getConfig;
