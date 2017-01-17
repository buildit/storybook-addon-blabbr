import React from 'react';
import { configure, setAddon, addDecorator } from '@kadira/storybook';
import { withKnobs } from '@kadira/storybook-addon-knobs';
import ReviewerAddon from '../src/';

setAddon(ReviewerAddon);

addDecorator(withKnobs);

// Now go through all the stories in the src tree
function requireAll(context) {
    return context.keys().map(context)
}

function loadStories() {
  requireAll(require.context('../', true, /.+\/story.jsx/))
}

configure(loadStories, module);
