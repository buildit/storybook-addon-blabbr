import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line
import Comments from './';

test('Comments render correctly', () => {
  const tree = renderer.create(
    <Comments
      comments={[]}
      commentIdBeingEdited="commentId123"
      userCommentBeingUpdated="updating comment"
      currentUser="currentUser"
      onUserCommentUpdate={() => {}}
      onUserCommentEdit={() => {}}
      onUserCommentEditSave={() => {}}
      onUserCommentEditCancel={() => {}}
      onUserCommentDelete={() => {}}
      isShowingAllComments
      onShowAllComments={() => {}}
    />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
