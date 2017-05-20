/* eslint-disable no-console */

const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

const thisPath = process.cwd();
const projectPath = path.join(thisPath, '../../..');
const projectSB = path.join(projectPath, '.storybook');

// Check if there is a .storybook dir in projectPath
console.log(chalk.blue(`Checking for .storybook in ${projectPath}`));
fs.access(projectSB, fs.constants.W_OK, (err) => {
  if (err) {
    console.log(chalk.red(`Could not find .storybook folder in ${projectPath}`));
    return;
  }

  // Check for head.html
  const headHTML = 'head.html';
  fs.access(path.join(`${projectSB}`, headHTML), fs.constants.R_OK, (err2) => {
    if (err2) {
      console.log(chalk.blue(`Attempting to copy ${headHTML} into ${projectSB}`));
      // Not found, try to copy
      fs.copy(path.join(`${thisPath}`, 'config', headHTML),
              path.join(`${projectSB}`, headHTML))
          .then(() => console.log(chalk.green(`Copied head.html into ${projectSB}`)))
          .catch(() => console.log(chalk.red(`Could not copy ${path.join(`${thisPath}`, 'config', headHTML)} into ${projectSB}`)));

      return;
    }

    console.log(chalk.red(`${headHTML} already exists in ${projectSB}`));
  });

  // Check for blabbr-config
  const blabbrConfig = 'blabbr-config.sample.js';
  fs.access(path.join(`${projectSB}`, 'blabbr-config.js'), fs.constants.R_OK, (err2) => {
    if (err2) {
      console.log(chalk.blue(`Attempting to copy ${blabbrConfig} into ${projectSB}`));
      // Not found, try to copy
      fs.copy(path.join(`${thisPath}`, 'config', blabbrConfig),
              path.join(`${projectSB}`, blabbrConfig))
          .then(() => {
            console.log(chalk.green(`Copied ${blabbrConfig} into ${projectSB}`));
            console.log(chalk.white(`You must now edit ${blabbrConfig} and rename to blabbr-config.js`));
          })
          .catch(() => console.log(chalk.red(`Could not copy ${path.join(`${thisPath}`, 'config', blabbrConfig)} into ${projectSB}`)));

      return;
    }

    console.log(chalk.red(`blabbr-config.js already exists in ${projectSB}`));
  });
});
