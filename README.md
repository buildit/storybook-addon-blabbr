# storybook-addon-blabbr

Component reviewer and approver for React Storybook.

## Configuration

blabbr expects to find a `storybook-config.json` configuration file at the root of your host, for static builds, or inside your storybook setup folder (generally `.storybook`). This should look like this:

```
{
  "storybook": {
    "blabbr": {
      "db": {
        "user": "username",
        "pwd": "password",
        "host": "db-endpoint"
      },
      "slack": {
        "endPoint": "http://your-slack-endpoint"
      },
      "ui": {
        "avatar": true
      }
    }
  }
}
```

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

Comments are formatted using the [marked](https://www.npmjs.com/package/marked) package.
