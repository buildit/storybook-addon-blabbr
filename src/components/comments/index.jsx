import React, { PropTypes } from 'react';
import { ListGroup } from 'react-bootstrap';
import Comment from '../comment';
import SubmitComment from '../submitComment';
import { getTimestamp } from '../../utils';

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
}) => {
	const commentsComponents = comments.map((comment, i) => {
		const timestamp = getTimestamp(comment.timestamp);
		const lastUpdated = getTimestamp(comment.lastUpdated);
		const beingEditted = comment.id === commentIdBeingEditted;

		if (beingEditted) {
			userCommentBeingUpdated = userCommentBeingUpdated === null ? comment.comment : userCommentBeingUpdated;
		}

		return (
			<div key={i}>
			{ !!beingEditted === true ?
				<SubmitComment key={i}
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
	return 	(
		<ListGroup componentClass="ul">
			{ commentsComponents.length ? commentsComponents : <p>No comments to show for this story</p> }
		</ListGroup>
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
};

Comment.defaultProps = {
	comments: [],
};

export default Comments;
