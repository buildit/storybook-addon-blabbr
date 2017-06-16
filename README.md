# storybook-addon-blabbr

Component reviewer and approver for React Storybook.

## Configuration

blabbr expects to find a `storybook-config.json` configuration file at the root of your host, for static builds, or inside your storybook setup folder (generally `.storybook`). 

Fill out the template located at `.storybook/storybook-config.json.template` and rename it to `storybook-config.json`.

This should look like this:

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

To use the plugin you need to register it, like most Storybook plugins. Simply add the following to your `addons.js` file in the storybook configuration:

`import '@buildit/storybook-addon-blabbr/register';`

## Comment formatting

Comments are formatted using the [marked](https://www.npmjs.com/package/marked) package.
