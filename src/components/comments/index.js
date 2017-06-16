import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Comment from '../comment';
import SubmitCommentForm from '../submitComment';
import { getTimestamp } from '../../utils';
import './styles.css';

const Comments = ({
  comments,
  currentUser,
  commentIdBeingEdited,
  userCommentBeingUpdated,
  handleEditUserComment,
  handleEditUserCommentChange,
  handleEditUserCommentSubmit,
  handleEditUserCommentCancel,
  handleDeleteUserComment,
  handleShowAllComments,
  isShowingAllComments,
  activeVersion
}) => {
  const commentsComponents = comments.map(comment => {
    const timestamp = getTimestamp(comment.timestamp);
    const lastUpdated = getTimestamp(comment.lastUpdated);
    const beingEdited = comment._id === commentIdBeingEdited;

    let userCommentBeingUpdatedFn;
    if (beingEdited) {
      userCommentBeingUpdatedFn = userCommentBeingUpdated === null
        ? comment.comment
        : userCommentBeingUpdated;
    } else {
      userCommentBeingUpdatedFn = userCommentBeingUpdated;
    }

    const commentOrSubmit = !!beingEdited === true
      ? <SubmitCommentForm
          key={comment._id}
          userComment={userCommentBeingUpdatedFn}
          handleChange={handleEditUserCommentChange}
          handleSubmit={handleEditUserCommentSubmit}
          onCommentCancel={handleEditUserCommentCancel}
          title={'Edit comment'}
          comment={comment}
          type={'Edit'}
        />
      : <Comment
          key={comment._id}
          handleEditUserComment={handleEditUserComment}
          handleDeleteUserComment={handleDeleteUserComment}
          currentUserIsOwner={currentUser === comment.userEmail}
          username={comment.userName}
          emailId={comment.userEmail}
          timestamp={timestamp}
          comment={comment.comment}
          commentId={comment._id}
          edited={comment.edited}
          lastUpdated={lastUpdated}
          version={comment.version}
          activeVersion={activeVersion}
        />;

    return commentOrSubmit;
  });

  const showAllCommentsLink = !isShowingAllComments
    ? <button style={{ marginBottom: 20 }} onClick={handleShowAllComments}>
        Show all comments
      </button>
    : null;

  return (
    <div>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="comment"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={false}
      >
        {comments.length
          ? commentsComponents
          : <p key="no-comments">No comments to show for this story.</p>}
      </ReactCSSTransitionGroup>
      {showAllCommentsLink}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
  commentIdBeingEdited: PropTypes.string,
  userCommentBeingUpdated: PropTypes.string,
  currentUser: PropTypes.string.isRequired,
  handleEditUserComment: PropTypes.func.isRequired,
  handleEditUserCommentChange: PropTypes.func.isRequired,
  handleEditUserCommentSubmit: PropTypes.func.isRequired,
  handleEditUserCommentCancel: PropTypes.func.isRequired,
  handleDeleteUserComment: PropTypes.func.isRequired,
  handleShowAllComments: PropTypes.func.isRequired,
  isShowingAllComments: PropTypes.bool.isRequired,
  activeVersion: PropTypes.string.isRequired
};

Comment.defaultProps = {
  comments: []
};

export default Comments;
