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
