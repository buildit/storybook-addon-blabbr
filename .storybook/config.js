import React from 'react';
import { configure, setAddon, addDecorator } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';

addDecorator(withKnobs);

// Now go through all the stories in the src tree
function requireAll(context) {
    return context.keys().map(context)
}

function loadStories() {
  requireAll(require.context('../src/', true, /.+\/story.js$/));
}

configure(loadStories, module);
