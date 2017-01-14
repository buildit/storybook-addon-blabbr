import React from 'react';
import { configure, setAddon } from '@kadira/storybook';
import ReviewerAddon from '../src/';

setAddon(ReviewerAddon);

function loadStories() {
  require('../example/story');
}

configure(loadStories, module);
