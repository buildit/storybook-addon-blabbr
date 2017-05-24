/* eslint-disable no-console */

const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

const configDirectory = path.join(__dirname, '../config')
const storybookDirectory = path.join(__dirname, '../.storybook');

// Check if there is a .storybook dir in current project
console.log(chalk.blue(`Checking for .storybook at ${storybookDirectory}`));
fs.access(storybookDirectory, fs.constants.W_OK, (err) => {
  if (err) {
    console.log(chalk.red(`Could not find .storybook folder at ${storybookDirectory}`));
    return;
  }

  // Check for head.html
  const headHTML = 'head.html';
  fs.access(path.join(`${storybookDirectory}`, headHTML), fs.constants.R_OK, (err2) => {
    if (err2) {
      console.log(chalk.blue(`Attempting to copy ${headHTML} into ${storybookDirectory}`));
      // Not found, try to copy
      fs.copy(path.join(`${configDirectory}`, headHTML),
              path.join(`${storybookDirectory}`, headHTML))
          .then(() => console.log(chalk.green(`Copied head.html into ${storybookDirectory}`)))
          .catch(() => console.log(chalk.red(`Could not copy ${path.join(`${configDirectory}`, headHTML)} into ${storybookDirectory}`)));

      return;
    }

    console.log(chalk.red(`${headHTML} already exists in ${storybookDirectory}`));
  });

  // Check for blabbr-config
  const blabbrConfig = 'blabbr-config.sample.js';
  fs.access(path.join(`${storybookDirectory}`, 'blabbr-config.js'), fs.constants.R_OK, (err2) => {
    if (err2) {
      console.log(chalk.blue(`Attempting to copy ${blabbrConfig} into ${storybookDirectory}`));
      // Not found, try to copy
      fs.copy(path.join(`${configDirectory}`, blabbrConfig),
              path.join(`${storybookDirectory}`, blabbrConfig))
          .then(() => {
            console.log(chalk.green(`Copied ${blabbrConfig} into ${storybookDirectory}`));
            console.log(chalk.white(`You must now edit ${blabbrConfig} and rename to blabbr-config.js`));
          })
          .catch(() => console.log(chalk.red(`Could not copy ${path.join(`${configDirectory}`, blabbrConfig)} into ${storybookDirectory}`)));

      return;
    }

    console.log(chalk.red(`blabbr-config.js already exists in ${storybookDirectory}`));
  });
});
