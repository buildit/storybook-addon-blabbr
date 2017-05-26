/* eslint-disable no-console */
const chalk = require('chalk');
// const path = require('path');
// const fs = require('fs-extra');
const inquirer = require('inquirer');
const prompts = require('./prompts');
const { copyFiles } = require('./copy-files');

const buildConfig = (local) => {
  inquirer.prompt(prompts.prompts).then((answers) => {
    if (prompts.createConfig(answers)) {
      // Generate config
    } else if (answers.configureBlabbr) {
      // Just copy the samlpe files
      copyFiles(local);
      console.log(chalk.bgBlue('Do not forget to add the following to your storybook webpack config:'));
      console.log(chalk.bgBlue("  'blabbr-config': path.join(path.resolve(__dirname), '../config/blabbr-config.js'"));
    }
  });
};

module.exports.buildConfig = buildConfig;
