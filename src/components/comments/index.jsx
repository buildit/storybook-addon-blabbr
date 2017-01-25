import React, { PropTypes } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import Comment from '../comment';
import SubmitComment from '../submitComment';
import { getTimestamp } from '../../utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './styles.css';

const Comments = ({
	comments,
	currentUser,
	commentIdBeingEditted,
	userCommentBeingUpdated,
	onUserCommentEditCancel,
	onUserCommentEditSave,
	onUserCommentUpdate,
	onUserCommentEdit,
	onUserCommentDelete,
	onShowAllComments,
	isShowingAllComments
}) => {
	const commentsComponents = comments.map((comment, i) => {
			const timestamp = getTimestamp(comment.timestamp);
			const lastUpdated = getTimestamp(comment.lastUpdated);
			const beingEditted = comment.id === commentIdBeingEditted;

			if (beingEditted) {
				userCommentBeingUpdated = userCommentBeingUpdated === null ? comment.comment : userCommentBeingUpdated;
			}

			return (
				<div key={comment.id} className="comment-container">
				 { !!beingEditted === true ?
					<SubmitComment
						userComment={userCommentBeingUpdated}
						onUserCommentChange={onUserCommentUpdate}
						onCommentSubmit={onUserCommentEditSave}
						onCommentCancel={onUserCommentEditCancel}
						title={'Edit comment'}
						comment={comment}
						type={'Edit'}
					/>
					 :
					 <Comment
						onUserCommentEdit={onUserCommentEdit}
						onUserCommentDelete={onUserCommentDelete}
						currentUserIsOwner={currentUser === comment.userEmail}
						username={comment.userName}
						emailId={comment.userEmail}
						timestamp={timestamp}
						comment={comment.comment}
						commentId={comment.id}
						edited={comment.edited}
						lastUpdated={lastUpdated}
	 		  	 />
				 }
				</div>
			)
		});

	const showAllCommentsLink = !isShowingAllComments ?
		<Button bsStyle="link" block style={{ marginBottom: 20 }} onClick={onShowAllComments}>
			Show all comments
		</Button> :
		null;

	return 	(
		<div>
			<ReactCSSTransitionGroup
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
			{showAllCommentsLink}
		</div>
	);
};

Comments.propTypes = {
  comments: PropTypes.array,
	commentIdBeingEditted: PropTypes.string,
	userCommentBeingUpdated: PropTypes.string,
  currentUser: PropTypes.string.isRequired,
	onUserCommentUpdate: PropTypes.func.isRequired,
	onUserCommentEdit: PropTypes.func.isRequired,
	onUserCommentEditSave: PropTypes.func.isRequired,
	onUserCommentEditCancel: PropTypes.func.isRequired,
  onUserCommentDelete: PropTypes.func.isRequired,
	isShowingAllComments: PropTypes.bool.isRequired,
	onShowAllComments: PropTypes.func.isRequired
};

Comment.defaultProps = {
	comments: [],
};

export default Comments;
