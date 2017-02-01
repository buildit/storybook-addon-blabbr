# storybook-addon-blabbr

Component comment generator and progress indicator for React Storybook.

<<<<<<< HEAD
### DB
Currently it is setup to work with a PouchDB. To configure the connection you need to create a file containing the following:

```
const config = {
  user: '<YOUR_API_KEY>',
  pwd: '<YOUR_API_PASSWORD>',
  host: '<YOUR_HOST_NAME>',
};
export default config;
```

You can store that anywhere in your project. You will need to edit the webpack config to resolve it. To do that either add the following to the `resolve` section in your `webpack.config.js` file in `.storybook/`:

```
  alias: {
    'blabbr-config': path.join(path.resolve(__dirname), '../<PATH_TO_YOUR_CONFIG>')
  }
```

or, if you don't have a `webpack.config.js` in your `.storybook` folder, extend the base config to have the above alias setup. Please see the
[Storybook documentation](https://getstorybook.io/docs/react-storybook/configurations/custom-webpack-config#full-control-mode) on how to do this.

### Configuration
To use the plugin you need to register the plugin and add a decorator, like most Storybook plugins.

First add the following to your `addons.js` file in the storybook configuration:
=======
## Usage
The plugin will show the comments in a separate panel.
>>>>>>> wip

`import '@buildit/storybook-addon-blabbr/register';`

Then configure the decorator. Add the following to your `config.js` in the storybook configuration:

```
import { withComments } from '@buildit/storybook-addon-blabbr';

addDecorator(withComments);
```

### Topics to discuss
<<<<<<< HEAD
- Authentication
- Offline first
- Versioning
=======
- Am I online / offline (status indicator)?
- Add to a build process and host on Cloudant
- Authentication (Active Directory?)
- Versioning (design -> development -> testing -> staging -> production)?
>>>>>>> wip
- Design
