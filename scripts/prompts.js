// const options = require('./options');

// const validateFilename = (input) => {
//   if (input) {
//      // TODO This regex probably needs to be checked
//     const rg = /^[0-9a-zA-Z]+$/;
//     if (rg.test(input)) {
//       return true;
//     }
//     return 'Component name can only include alphanumeric characters';
//   }
//
//   return 'You need to provide a name';
// };
//
// const validateProjectName = (input) => {
//   if (input) {
//      // TODO This regex probably needs to be checked
//     const rg = /^[0-9a-zA-Z\-]+$/;
//     if (rg.test(input)) {
//       return true;
//     }
//     return 'Project name can only include alphanumeric characters and a hyphen';
//   }
//   return 'You need to provide a name';
// };

module.exports.promptExisting = [
  {
    type: 'confirm',
    name: 'configureBlabbr',
    message: 'Do you want to configure blabbr?',
    default: false,
  },
];

const configVsSampleOptions = ['Create new config', 'Copy sample file'];

const createConfig = answers => answers && answers.configVsSample === configVsSampleOptions[0];
module.exports.createConfig = createConfig;

module.exports.prompts = [
  {
    type: 'list',
    name: 'configVsSample',
    message: 'Do you want to create a config or just copy a sample file?',
    choices: configVsSampleOptions,
    default: configVsSampleOptions[0],
  },
  {
    when: props => props.configVsSample === configVsSampleOptions[0],
    type: 'input',
    name: 'dbUser',
    message: 'What is the db username',
    default: '',
  },

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

];

// export const prompts = [
//   {
//     type: 'input',
//     name: 'projectName',
//     message: 'What is the project name?',
//     default: options.getProjectName(),
//     validate: validateProjectName,
//   },
//   {
//     type: 'list',
//     name: 'siteType',
//     message: 'What site is your component for?',
//     choices: options.getSiteTypes(),
//     default: options.getSiteTypes()[0],
//   },
//   {
//     type: 'list',
//     name: 'componentType',
//     message: 'What is the type of your new component?',
//     choices: options.getComponentTypes(),
//     default: 'Atom',
//   },
//   {
//     type: 'input',
//     name: 'componentName',
//     message: 'What is the name of your new component?',
//     default: '',
//     validate: validateFilename,
//   },
//   {
//     type: 'confirm',
//     name: 'acceptsOthers',
//     message: 'Does it accept other components?',
//     default: false,
//   },
//   {
//     when: props => props.acceptsOthers,
//     type: 'checkbox',
//     name: 'acceptedTypes',
//     message: 'Accepted component types',
//     choices: options.getComponentTypes(),
//   },
// ];
