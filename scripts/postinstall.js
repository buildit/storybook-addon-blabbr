/* eslint-disable no-console */

const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');

const prompts = require('./prompts');

// Add sample config or generate via q&a?
// If copy then check for path and copy
// If generate ask for DB
// Ask for slack
// Ask for UI avatar
// Ask for versions

// Do you want to add the head?
// - check if path exists
// - create?
// - check if head exists
// - copy?
// - if exists then just copy as temp file and ask to manually merge

// Check if there is a .storybook dir in projectPath
const thisPath = process.cwd();
const projectPath = path.join(thisPath, '../../..');
const projectSB = path.join(projectPath, '.storybook');

console.log(chalk.blue(`Checking for .storybook in ${projectPath}`));
let foundConfig = true;
fs.access(projectSB, fs.constants.W_OK, (err) => {
  if (err) {
    foundConfig = false;
  }
});

if (foundConfig) {
  console.log(chalk.white(`A config has been detected in ${projectSB}. You can either leave it or overwrite it.`));
} else {
  console.log(chalk.white(`Could not find .storybook folder in ${projectPath}.`));
}

inquirer.prompt(prompts.promptExisting).then((configureAnswer) => {
  if (configureAnswer.configureBlabbr) {
    inquirer.prompt(prompts.prompts).then((answers) => {
      if (prompts.createConfig(answers)) {
        console.log('Creating new config');
      } else {
        console.log('Just copying sample');
      }
    });
  }
});

//   // Check for head.html
//   const headHTML = 'head.html';
//   fs.access(path.join(`${projectSB}`, headHTML), fs.constants.R_OK, (err2) => {
//     if (err2) {
//       console.log(chalk.blue(`Attempting to copy ${headHTML} into ${projectSB}`));
//       // Not found, try to copy
//       fs.copy(path.join(`${thisPath}`, 'config', headHTML),
//               path.join(`${projectSB}`, headHTML))
//           .then(() => console.log(chalk.green(`Copied head.html into ${projectSB}`)))
//           .catch(() => console.log(chalk.red(`Could not copy ${path.join(`${thisPath}`, 'config', headHTML)} into ${projectSB}`)));
//
//       return;
//     }
//
//     console.log(chalk.red(`${headHTML} already exists in ${projectSB}`));
//   });
//
//   // Check for blabbr-config
//   const blabbrConfig = 'blabbr-config.sample.js';
//   fs.access(path.join(`${projectSB}`, 'blabbr-config.js'), fs.constants.R_OK, (err2) => {
//     if (err2) {
//       console.log(chalk.blue(`Attempting to copy ${blabbrConfig} into ${projectSB}`));
//       // Not found, try to copy
//       fs.copy(path.join(`${thisPath}`, 'config', blabbrConfig),
//               path.join(`${projectSB}`, blabbrConfig))
//           .then(() => {
//             console.log(chalk.green(`Copied ${blabbrConfig} into ${projectSB}`));
//             console.log(chalk.white(`You must now edit ${blabbrConfig} and rename to blabbr-config.js`));
//           })
//           .catch(() => console.log(chalk.red(`Could not copy ${path.join(`${thisPath}`, 'config', blabbrConfig)} into ${projectSB}`)));
//
//       return;
//     }
//
//     console.log(chalk.red(`blabbr-config.js already exists in ${projectSB}`));
//   });
// });
