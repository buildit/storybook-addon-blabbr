import React from 'react';
import { StoryWrapper } from './components';

function addComments(storyName, storyFn, _options) {
  return this.add(storyName, (context) => (
    <StoryWrapper>
      {storyFn(context)}
    </StoryWrapper>
  ));
}

export default { addComments };
