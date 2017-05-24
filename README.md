# storybook-addon-blabbr

Component reviewer and approver for React Storybook.

## Configuration

See the [Storybook Playground documentation](https://github.com/buildit/storybook-playground).

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
