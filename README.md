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
    },
    "versions": {
      "regex": "\/([^\/]+?)\/?$"
    }
  }
}
```

The `versions` part is the same as in the [versions addon](https://github.com/buildit/storybook-addon-versions) and the above pattern will work for the format `http://localhost:port/<version>/` so for example, version `0.1.2` would be expected to be found like this `http://mystorybook/0.1.2/`.

## Storybook registration

To use the plugin you need to register it, like most Storybook plugins. Simply add the following to your `addons.js` file in the storybook configuration:

`import '@buildit/storybook-addon-blabbr/register';`

## Comment formatting

Comments are formatted using the [marked](https://www.npmjs.com/package/marked) package.
