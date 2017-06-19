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

The host for the blabbr db should be `localhost:5984/blabbr` if using local CouchDB (see below). User and pwd can be omitted in that case.

## Storybook registration

To use the plugin you need to register it, like most Storybook plugins. Simply add the following to your `addons.js` file in the storybook configuration:

`import '@buildit/storybook-addon-blabbr/register';`

## Comment formatting

Comments are formatted using the [marked](https://www.npmjs.com/package/marked) package.

## Local CouchDB setup

[Install Apache CouchDB](http://couchdb.apache.org/) by downloading the respective installer for your OS.

Once installation is done, navigate to [http://localhost:5984](http://localhost:5984). Create an admin username and password.

Go to configuration and CORS and enable CORS.

Add the correct values to the `storybook-config.json` as mentioned above.
