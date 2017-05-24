/* eslint-disable no-console */

const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');

const thisPath = process.cwd();
const headHTML = 'head.html';

fs.copy(path.join(`${thisPath}`, 'config', headHTML),
        path.join(`${thisPath}`, '.storybook', headHTML))
  .then(() => console.log(chalk.green('Copied head.html into .storybook')))
  .catch(() => console.log(chalk.red(`Could not copy ${path.join(`${thisPath}`, 'config', headHTML)} into .storybook`)));
