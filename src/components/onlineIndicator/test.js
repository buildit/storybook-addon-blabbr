import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line
import OnlineIndicator from './';

test('Online indicator renders correctly when system is offline', () => {
  const tree = renderer.create(<OnlineIndicator isOnline={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Online indicator renders correctly when system is online', () => {
  const tree = renderer.create(<OnlineIndicator isOnline />).toJSON();
  expect(tree).toMatchSnapshot();
});
