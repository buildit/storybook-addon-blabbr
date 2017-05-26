/* eslint-disable no-console */
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

const copyFiles = (local) => {
  const currentDir = process.cwd();
  const consumerDirectory = path.join(currentDir, local ? '.' : '../../..');
  const storybookDirectory = path.join(consumerDirectory, '.storybook');
  const blabbrConfig = 'blabbr-config.sample.js';
  const head = 'head.sample.html';

  fs.access(storybookDirectory, fs.constants.W_OK, (err) => {
    if (err) {
      console.log(chalk.red(`${storybookDirectory} either does not exists or you do not have write access`));
      return;
    }

    console.log(chalk.blue(`Copying sample config file to ${storybookDirectory}`));
    fs.copy(path.join(`${currentDir}`, 'config', blabbrConfig),
            path.join(`${storybookDirectory}`, blabbrConfig),
            { overwrite: true })
      .then(() => {
        console.log(chalk.green(`Copied ${blabbrConfig} into ${storybookDirectory}`));
        console.log(chalk.bold(`You must now edit ${blabbrConfig} and rename to blabbr-config.js`));
      })
      .catch(() => console.log(chalk.red(`Could not copy
        ${path.join(`${currentDir}`, 'config', blabbrConfig)} into ${storybookDirectory}`)));

    console.log(chalk.blue(`Copying sample head file to ${storybookDirectory}`));
    fs.copy(path.join(`${currentDir}`, 'config', head),
            path.join(`${storybookDirectory}`, head),
            { overwrite: true })
      .then(() => {
        console.log(chalk.green(`Copied ${head} into ${storybookDirectory}`));
        console.log(chalk.bold(`You must now merge ${head} into head.html`));
      })
      .catch(() => console.log(chalk.red(`Could not copy
        ${path.join(`${currentDir}`, 'config', head)} into ${storybookDirectory}`)));
  });
};

module.exports = {
  copyFiles,
};
