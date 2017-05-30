// Create new config vs copy sample file options
const configVsSampleOptions = ['Create new config', 'Copy example files'];
const createConfig = answers => answers &&
                                answers.configureBlabbr &&
                                answers.configVsSample === configVsSampleOptions[0];
module.exports.createConfig = createConfig;

// Do we want slack integration?
const createSlackConfig = answers => createConfig(answers) && answers.slackConfig;

// The questions
module.exports.prompts = [
  // Configure, yes or no?
  {
    type: 'confirm',
    name: 'configureBlabbr',
    message: 'Do you want to configure blabbr?',
    default: true,
  },
  // Copy sample or build config?
  {
    when: props => props.configureBlabbr,
    type: 'list',
    name: 'configVsSample',
    message: 'Do you want to create a config or just copy the example files?',
    choices: configVsSampleOptions,
    default: configVsSampleOptions[0],
  },
  // DB config
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
  // Slack
  {
    when: props => createConfig(props),
    type: 'confirm',
    name: 'slackConfig',
    message: 'Do you want to add slack integration?',
    default: true,
  },
  {
    when: props => createSlackConfig(props),
    type: 'input',
    name: 'slackEndpoint',
    message: 'What is the slack endpoint?',
    default: '',
  },
  // UI options
  {
    when: props => createConfig(props),
    type: 'confirm',
    name: 'showAvatar',
    message: 'Do you want to show user avatars (from gravatar) in comments?',
    default: true,
  },
  // Versions
  {
    when: props => createConfig(props),
    type: 'confirm',
    name: 'versionSupport',
    message: 'Do you want to support different versions of the styleguide?',
    default: true,
  },
];
