import React from 'react';
import addons from '@kadira/storybook-addons'; // eslint-disable-line
import { StoryWrapper } from './components';

function wrapStory(channel, storyFn, context) {
  return (
    <StoryWrapper channel={channel}>
      {storyFn(context)}
    </StoryWrapper>
  );
}

export function withComments(storyFn, context) {
  const channel = addons.getChannel();
  return wrapStory(channel, storyFn, context);
}
