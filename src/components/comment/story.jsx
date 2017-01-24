import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { text, boolean } from '@kadira/storybook-addon-knobs';
import Comment from './';

storiesOf('Comment')
  .add('Basic comment', () => (
    <Comment
      emailId={text('Email id', 'abc@efg.com')}
      username={text('User name', 'abc')}
      date={text('Date', 'xx/xx/xxxx')}
      comment={text('Comment', 'Lorem ipsum')}
      time={'22 Jan 2017, 18:02'}
      commentId={'123'}
      currentUserIsOwner={true}
      onUserCommentEdit={() => false}
      onUserCommentDelete={() => true}
    />
  ));
