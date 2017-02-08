import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line
import Offline from './';

test('Offline indicator renderes correctly', () => {
  const tree = renderer.create(
    <Offline isOnline={false} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Online indicator renderes correctly', () => {
  const tree = renderer.create(
    <Offline isOnline />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
