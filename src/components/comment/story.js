import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { text } from '@kadira/storybook-addon-knobs';
import Comment from './';

storiesOf('Comment')
  .add('Basic comment', () => (
    <Comment
      emailId={text('Email id', 'abc@efg.com')}
      username={text('User name', 'abc')}
      comment={text('Comment', 'Lorem ipsum')}
      timestamp={'22 Jan 2017, 18:02'}
      commentId={'123'}
      currentUserIsOwner
      onUserCommentEdit={() => false}
      onUserCommentDelete={() => true}
    />
  ))
  .add('Long comment', () => (
    <Comment
      emailId={text('Email id', 'abc@efg.com')}
      username={text('User name', 'abc')}
      comment={text('Comment', 'Beef frankfurter bresaola jowl corned beef turkey, t-bone prosciutto capicola. Andouille shank boudin, brisket tail kevin short loin. Kevin cow \n frankfurter bacon salami shank pork filet mignon burgdoggen. Pork jowl pig alcatra, meatball tenderloin salami turducken brisket ball tip spare ribs. Swine corned beef hamburger biltong beef ribs filet mignon t-bone picanha ribeye prosciutto frankfurter rump pork loin alcatra porchetta. Pork chop jowl filet mignon t-bone, frankfurter sausage corned beef cow brisket flank turkey pastrami tri-tip.')}
      timestamp={'22 Jan 2017, 18:02'}
      commentId={'123'}
      currentUserIsOwner
      onUserCommentEdit={() => false}
      onUserCommentDelete={() => true}
  />));
