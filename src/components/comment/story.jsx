import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { text, boolean } from '@kadira/storybook-addon-knobs';
import Comment from './';

storiesOf('Comment')
  .add('Basic comment', () => (
    <Comment
      emailId={text('Email id', 'abc@efg.com')}
      nickname={text('Nickname', 'abc')}
      date={text('Date', 'xx/xx/xxxx')}
      comment={text('Comment', 'Lorem ipsum')}
      approved={boolean('Approved', false)}
    />
  ));
