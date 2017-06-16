import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'; //eslint-disable-line
import Register from './';

const onChange = () => {
  action('register on change');
};

storiesOf('Register').add('User registration', () =>
  <Register handleChange={onChange} />
);
