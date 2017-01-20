import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Button from './Button';

storiesOf('Button')
  .add('basic', () => <Button label="The Button" onClick={action('onClick')} />)
  .addComments('basic Comments', () => <Button label="The Button" onClick={action('onClick')} />);
