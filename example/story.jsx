import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import { text } from '@kadira/storybook-addon-knobs';
import Button from './Button';

storiesOf('Button')
  .add('default button', () => <Button label={text('Label', 'The Button')} onClick={action('onClick')} />);
