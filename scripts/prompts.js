module.exports.promptExisting = [
];

const configVsSampleOptions = ['Create new config', 'Copy sample file'];
const createConfig = answers => answers &&
                                answers.configureBlabbr &&
                                answers.configVsSample === configVsSampleOptions[0];
module.exports.createConfig = createConfig;

const createSlackConfig = answers => createConfig(answers) && answers.slackConfig;

module.exports.prompts = [
  {
    type: 'confirm',
    name: 'configureBlabbr',
    message: 'Do you want to configure blabbr?',
    default: false,
  },
  {
    when: props => props.configureBlabbr,
    type: 'list',
    name: 'configVsSample',
    message: 'Do you want to create a config or just copy a sample file?',
    choices: configVsSampleOptions,
    default: configVsSampleOptions[0],
  },
  {
    when: props => createConfig(props),
    type: 'input',
    name: 'dbUser',
    message: 'What is the db username?',
    default: '',
  },
  {
    when: props => createConfig(props),
    type: 'input',
    name: 'dbPwd',
    message: 'What is the db password?',
    default: '',
  },
  {
    when: props => createConfig(props),
    type: 'input',
    name: 'dbEndpoint',
    message: 'What is the db endpoint?',
    default: '',
  },
  {
    when: props => createConfig(props),
    type: 'confirm',
    name: 'slackConfig',
    message: 'Do you want to add slack integration?',
    default: false,
  },
  {
    when: props => createSlackConfig(props),
    type: 'input',
    name: 'slackEndpoint',
    message: 'What is the slack endpoint?',
    default: '',
  },
  {
    when: props => createConfig(props),
    type: 'confirm',
    name: 'showAvatar',
    message: 'Do you want to show user avatars (from gravatar) in comments?',
    default: false,
  },

  // Ask for versions

  // Do you want to add the head?
  // - check if path exists
  // - create?
  // - check if head exists
  // - copy?
  // - if exists then just copy as temp file and ask to manually merge

];
