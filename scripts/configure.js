/* eslint-disable no-console */
const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const prompts = require('./prompts');
const { copyFiles } = require('./copy-files');

inquirer.prompt(prompts.prompts).then((answers) => {
  if (prompts.createConfig(answers)) {
    const currentDir = path.join(__dirname, '../');
    const consumerDirectory = process.cwd();
    const storybookDirectory = path.join(consumerDirectory, '.storybook');
    const blabbrConfig = 'blabbr-config.js';

    let exportsString = 'db';

    // Generate config
    const out = fs.createWriteStream(path.join(storybookDirectory, blabbrConfig));
    out.write('const db = {\n');
    out.write(`\tuser: '${answers.dbUser}',\n`);
    out.write(`\tpwd: '${answers.dbPwd}',\n`);
    out.write(`\thost: '${answers.dbEndpoint}'\n`);
    out.write('};\n');

    if (answers.slackConfig) {
      out.write('const slack = {\n');
      out.write(`\tendPoint: '${answers.slackEndpoint}'\n`);
      out.write('};\n');
      exportsString += ', slack';
    }

    out.write('const ui = {\n');
    out.write(`\tavatar: ${answers.showAvatar}\n`);
    out.write('};\n');
    exportsString += ', ui';

    if (answers.versionSupport) {
      out.write("const version = require('../package.json').version;\n");
      out.write("// or const version = '<YOUR_VERSION_NO>';\n");
      exportsString += ', version';

      // Copy the head
      fs.access(path.join(storybookDirectory, 'head.html'), fs.constants.R_OK, (err) => {
        const head = 'head.sample.html';
        if (err) {
          // If it does not exist just copy over
          fs.copy(path.join(`${currentDir}`, 'config', head),
                  path.join(`${storybookDirectory}`, 'head.html'));
          return;
        }
        // If it does exist then copy aside and prompt
        fs.copy(path.join(`${currentDir}`, 'config', head),
                path.join(`${storybookDirectory}`, head))
          .then(() => {
            console.log(chalk.bgBlue('Existing head.html found, copied the config into head.sample.html. You must now merge them.'));
          })
          .catch(() => console.log(chalk.red(`Could not copy
            ${path.join(`${currentDir}`, 'config', head)} into ${storybookDirectory}`)));
      });
      // Copy a versions file
      fs.access(path.join(storybookDirectory, 'versions.json'), fs.constants.R_OK, (err) => {
        const versions = 'versions.sample.json';
        if (err) {
          // If it does not exist just copy over
          fs.copy(path.join(`${currentDir}`, 'config', versions),
                  path.join(`${storybookDirectory}`, 'versions.json'));
        }
      });
    }

    out.write(`export { ${exportsString} };\n`);
    out.end();
    console.log(chalk.bgBlue(`Config created in ${storybookDirectory}`));
  } else if (answers.configureBlabbr) {
    // Just copy the samlpe files
    copyFiles();
    console.log(chalk.bgBlue('Do not forget to add the following to your storybook webpack config:'));
    console.log(chalk.bgBlue("  'blabbr-config': path.join(path.resolve(__dirname), '../config/blabbr-config.js'"));
  }
});
