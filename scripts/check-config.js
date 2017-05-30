/* eslint-disable no-console */
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

// Check if there is a .storybook dir in projectPath
const currentDir = path.join(__dirname, '../');
const consumerDirectory = path.join(currentDir, '../../..');
const storybookDirectory = path.join(consumerDirectory, '.storybook');
const configPath = path.join(storybookDirectory, 'blabbr-config.js');

// First check if we can find an existing storybook config
console.log(chalk.blue(`Checking for config in ${storybookDirectory}`));
fs.access(configPath, fs.constants.W_OK, (err) => {
  if (err) {
    console.log(chalk.bgBlue(
      'A valid configuration for blabbr could not be found. You can create one by running the blabbr-config script.'));
  }
});
