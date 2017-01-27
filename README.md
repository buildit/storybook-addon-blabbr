# storybook-addon-blabbr

Component reviewer and approver for React Storybook.

## Usage
You can setup the plugin to either show the comment in a separate panel or inline in the story.

## API
Run up [the API](https://github.com/jon-ec/blabbr) locally. The addon expects the API to be available on
`http://localhost:3001`. You will need to sign up for a firebase ID and create a project and enter the relevant
info and keys to `src/components/api/db.js`.

### In Panel
To get the comments in a panel you will need to register the addon. Just add the following to your `addons.js` file in the storybook
configuration:
`import '@buildit/storybook-addon-blabbr';`

### Inline
To show comments inline in the story you need to configure the plugin as a decorator. Add the following to your `config.js` in the storybook configuration:

```
import { withComments } from '@buildit/storybook-addon-blabbr';

addDecorator(withComments);
```

### Topics to discuss
-Authentication
-Offline first
-Versioning
-Design
