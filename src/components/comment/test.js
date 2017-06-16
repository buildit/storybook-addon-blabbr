import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line
import Comment from './';

test('Comment renders correctly', () => {
  const tree = renderer
    .create(
      <Comment
        emailId="email@id.com"
        username="username"
        timestamp="1-Jan-17"
        comment="This is a comment"
        commentId="id123"
        currentUserIsOwner
        handleEditUserComment={() => {}}
        handleDeleteUserComment={() => {}}
        edited
        lastUpdated="2-Jan-17"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
