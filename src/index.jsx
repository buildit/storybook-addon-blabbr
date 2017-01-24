import React from 'react';
import addons from '@kadira/storybook-addons';
import { StoryWrapper } from './components';

function wrapStory(channel, storyFn, context, panels) {
  return (
    <StoryWrapper channel={channel}>
      {storyFn(context)}
    </StoryWrapper>
  );
}

export function withComments(storyFn, context) {
  const channel = addons.getChannel();
  return wrapStory(channel, storyFn, context, addons.getPanels());
}
