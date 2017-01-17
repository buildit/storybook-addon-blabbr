import React from 'react';

const Comment = props =>
  <div>
    <p>{props.emailId}</p>
    <p>{props.nickname}</p>
    <p>{props.date}</p>
    <p>{props.comment}</p>
    <p>{props.approved.toString()}</p>
  </div>;

Comment.propTypes = {
  emailId: React.PropTypes.string.isRequired,
  nickname: React.PropTypes.string,
  date: React.PropTypes.string.isRequired,
  comment: React.PropTypes.string.isRequired,
  approved: React.PropTypes.bool,
};

Comment.defaultProps = {
  nickname: '',
  approved: false,
};

export default Comment;
