/* eslint-disable no-console */
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const { buildConfig } = require('./config-builder');

// Check if there is a .storybook dir in projectPath
const currentDir = path.join(__dirname, '../');
const consumerDirectory = path.join(currentDir, '../../..');
const storybookDirectory = path.join(consumerDirectory, '.storybook');
const configPath = path.join(storybookDirectory, 'blabbr-config.js');

const force = process.argv[2];

if (force && force === 'force') {
  buildConfig(force);
} else {
  // First check if we can find an existing storybook config
  console.log(chalk.blue(`Checking for config in ${storybookDirectory}`));
  fs.access(configPath, fs.constants.W_OK, (err) => {
    if (err) {
      console.log(chalk.white(`Could not find .storybook folder in ${consumerDirectory}.`));
      buildConfig();
      return;
    }

    console.log(chalk.white(`A config has been detected in ${storybookDirectory}.`));
  });
}
