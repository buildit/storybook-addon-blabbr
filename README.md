# storybook-addon-blabbr

Component reviewer and approver for React Storybook.

## DB
Currently it is setup to work with a PouchDB. You can

### configuration
To use the plugin you need to register the plugin and add a decorator. You also need to setup the storybook webpack config to point to your DB configuration.

First add the following to your `addons.js` file in the storybook configuration:
`import '@buildit/storybook-addon-blabbr';`

Then configure the decorator. Add the following to your `config.js` in the storybook configuration:
```
import { withComments } from '@buildit/storybook-addon-blabbr';

addDecorator(withComments);
```

Finally add the following to the `resolve` section in your `webpack.config.js` file in `.storybook`:
```
  alias: {
    'blabbr-config': path.join(path.resolve(__dirname), '../<PATH_TO_YOUR_CONFIG>')
  }
```

The config will be a file containing the following:
```
const config = {
  user: '<YOUR_API_KEY>',
  pwd: '<YOUR_API_PASSWORD>',
  host: '<YOUR_HOST_NAME>',
};
export default config;
```

### Topics to discuss
-Authentication
-Offline first
-Versioning
-Design
