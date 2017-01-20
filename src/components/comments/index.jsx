import React, { PropTypes } from 'react';
import { ListGroup } from 'react-bootstrap';
import Comment from '../comment';

const Comments = ({ comments, currentUser, onUserCommentDelete }) => {
	const commentsComponents = comments.map((comment, i) => {
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		const _date = new Date(comment.timestamp);
		const date = _date.getDate();
		const month = months[_date.getMonth()];
		const year = _date.getFullYear();
		const time = `${_date.getHours()}:${('0'+ _date.getMinutes()).slice(-2)}`;
		return (
		  <Comment key={i}
	         onUserCommentDelete={onUserCommentDelete}
	         currentUserIsOwner={currentUser === comment.userEmail}
	         username={comment.userName}
	         emailId={comment.userEmail}
	         date={`${date} ${month} ${year}`}
             time={time}
	         comment={ comment.comment}
	         approved={comment.approved}
             commentId={comment.id}
		  />
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
  currentUser: PropTypes.string.isRequired,
  onUserCommentDelete: PropTypes.func.isRequired,
};

Comment.defaultProps = {
	comments: [],
};

export default Comments;
