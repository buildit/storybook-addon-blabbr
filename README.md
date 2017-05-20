# storybook-addon-blabbr

Component reviewer and approver for React Storybook.

## Configuration

You can configure various aspects of the plugin by creating a configuration file anywhere in your project and then setting up the webpack config to resolve it. To do that either add the following to the `resolve` section in your `webpack.config.js` file in `.storybook/`:

```
  alias: {
    'blabbr-config': path.join(path.resolve(__dirname), '../<PATH_TO_YOUR_CONFIG>')
  }
```

or, if you don't have a `webpack.config.js` in your `.storybook` folder, extend the base config to have the above alias setup. Please see the
[Storybook documentation](https://getstorybook.io/docs/react-storybook/configurations/custom-webpack-config#full-control-mode) on how to do this.

By default a sample config file, `blabbr-config.sample.js` is copied into the `.storybook` folder after installing the package.

### DB

Currently it is setup to work with CouchDB and uses PouchDB as the library and API over Couch. To configure the connection to CouchDB (either a local CouchDB or hosted on Cloudant) you need to add the following to your config:

```
const db = {
  user: '<YOUR_API_KEY>',
  pwd: '<YOUR_API_PASSWORD>',
  host: '<YOUR_HOST_NAME>',
};
export { db };
```

### Slack

If you would like to see all comments on a slack channel then setup the slack integration and add the following to your config file:

```
const slack = {
  endPoint: '<YOUR_ENDPOINT>',
};

export { slack };

```

### UI Options

You can setup a number of UI options as follows:

```
const ui = {
  avatar: false,
  ...
};

export { ui };
```

The available options are:
- `avatar`: `true`/`false` to show avatars or not

### Version

You can set the version of the project/library you are working against using

```
const version = `<YOUR_VERSION_NO>`;
```

Alternatively you can tie it to the version specified in `package.json` like this:

```
const version = require('../package.json').version;
```

Ensure the path to `package.json` is correct relative to your blabbr config.

## Storybook registration

To use the plugin you need to register the plugin and add a decorator, like most Storybook plugins.

First add the following to your `addons.js` file in the storybook configuration:

`import '@buildit/storybook-addon-blabbr/register';`

Then configure the decorator. Add the following to your `config.js` in the storybook configuration:

```
import { withComments } from '@buildit/storybook-addon-blabbr';

addDecorator(withComments);
```

## Comment formatting

There is currently no formatting available in the comments section. However, the editor does two things:

1. Retains multi-line format
2. Parses hyperlinks. So if you type `http://www.yoururl.com` in the box this will be shown as a link.

## Versioning support

On startup, blabbr will attemp to get a list of versions available from the root of the host. It looks for
a file `versions.json` and expects to find an array with the versions listed. You can mock this using the provided
`versions.json` in `.storybook/`. This is used to populate the navigation section at the top of the story panel.

The navigation is added via `head.html`. This is copied into your `.storybook` folder *if a `head.html` does not already exist*. If it does you can find what you need to add in the package `config` directory.

## Post-install script

As mentioned in the sections above, a post install script will copy a `blabbr-config.sample.js` and a `head.html` file into your `.storybook` folder.
