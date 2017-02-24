import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Comment from '../comment';
import SubmitComment from '../submitComment';
import { getTimestamp } from '../../utils';
import { HyperLink } from '../typography/';
import './styles.css';

const Comments = ({
  comments,
  currentUser,
  commentIdBeingEdited,
  userCommentBeingUpdated,
  onUserCommentEditCancel,
  onUserCommentEditSave,
  onUserCommentUpdate,
  onUserCommentEdit,
  onUserCommentDelete,
  onShowAllComments,
  isShowingAllComments,
}) => {
  const commentsComponents = comments.map((comment) => {
    const timestamp = getTimestamp(comment.timestamp);
    const lastUpdated = getTimestamp(comment.lastUpdated);
    const beingEdited = comment._id === commentIdBeingEdited;

    let userCommentBeingUpdatedFn;
    if (beingEdited) {
      userCommentBeingUpdatedFn =
        userCommentBeingUpdated === null ? comment.comment : userCommentBeingUpdated;
    } else {
      userCommentBeingUpdatedFn = userCommentBeingUpdated;
    }

    const commentOrSubmit = !!beingEdited === true ?
      (<SubmitComment
        key={comment._id}
        userComment={userCommentBeingUpdatedFn}
        onUserCommentChange={onUserCommentUpdate}
        onCommentSubmit={onUserCommentEditSave}
        onCommentCancel={onUserCommentEditCancel}
        title={'Edit comment'}
        comment={comment}
        type={'Edit'}
      />)
      :
      (<Comment
        key={comment._id}
        onUserCommentEdit={onUserCommentEdit}
        onUserCommentDelete={onUserCommentDelete}
        currentUserIsOwner={currentUser === comment.userEmail}
        username={comment.userName}
        emailId={comment.userEmail}
        timestamp={timestamp}
        comment={comment.comment}
        commentId={comment._id}
        edited={comment.edited}
        lastUpdated={lastUpdated}
      />);

    return commentOrSubmit;
  });

  const showAllCommentsLink = !isShowingAllComments ?
    (<HyperLink secondary style={{ display: 'block', textAlign: 'center', width: '100%' }} onClick={onShowAllComments}>
      Show all comments
    </HyperLink>) :
    null;

  return (
    <div>
      <ReactCSSTransitionGroup
        component="div"
        transitionName="comment"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={false}
      >
        { comments.length ?
          commentsComponents :
          <p key="no-comments">No comments to show for this story</p>
        }
      </ReactCSSTransitionGroup>
      <div style={{ display: 'block', margin: '10px 0', with: '100%' }}>
        {showAllCommentsLink}
      </div>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.array,
  commentIdBeingEdited: PropTypes.string,
  userCommentBeingUpdated: PropTypes.string,
  currentUser: PropTypes.string.isRequired,
  onUserCommentUpdate: PropTypes.func.isRequired,
  onUserCommentEdit: PropTypes.func.isRequired,
  onUserCommentEditSave: PropTypes.func.isRequired,
  onUserCommentEditCancel: PropTypes.func.isRequired,
  onUserCommentDelete: PropTypes.func.isRequired,
  isShowingAllComments: PropTypes.bool.isRequired,
  onShowAllComments: PropTypes.func.isRequired,
};

Comment.defaultProps = {
  comments: [],
};

export default Comments;
