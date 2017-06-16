import React from 'react';
import renderer from 'react-test-renderer'; // eslint-disable-line
import Comments from './';

test('Comments render correctly', () => {
  const tree = renderer
    .create(
      <Comments
        comments={[]}
        commentIdBeingEdited="commentId123"
        userCommentBeingUpdated="updating comment"
        currentUser="currentUser"
        handleEditUserComment={() => {}}
        handleEditUserCommentChange={() => {}}
        handleEditUserCommentSubmit={() => {}}
        handleEditUserCommentCancel={() => {}}
        handleDeleteUserComment={() => {}}
        handleShowAllComments={() => {}}
        isShowingAllComments
        activeVersion=""
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
