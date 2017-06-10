/* eslint-disable no-console */
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

const copyFiles = () => {
  const currentDir = path.join(__dirname, '../');
  const consumerDirectory = process.cwd();
  const storybookDirectory = path.join(consumerDirectory, '.storybook');
  const blabbrConfig = 'blabbr-config.sample.js';

  fs.access(storybookDirectory, fs.constants.W_OK, (err) => {
    if (err) {
      console.log(chalk.red(`${storybookDirectory} either does not exists or you do not have write access`));
      return;
    }

    fs.copy(path.join(`${currentDir}`, 'config', blabbrConfig),
            path.join(`${storybookDirectory}`, blabbrConfig),
            { overwrite: true })
      .then(() => {
        console.log(chalk.bgBlue(`You must now edit ${blabbrConfig} and rename to blabbr-config.js`));
      })
      .catch(() => console.log(chalk.red(`Could not copy
        ${path.join(`${currentDir}`, 'config', blabbrConfig)} into ${storybookDirectory}`)));
  });
};

module.exports = {
  copyFiles,
};
