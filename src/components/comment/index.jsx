import React, { PropTypes } from 'react';
import { Panel, Well, Button } from 'react-bootstrap';
const Comment = ({
  username,
  emailId,
  date,
  time,
  comment,
  approved,
  currentUserIsOwner,
  commentId,
  onUserCommentDelete,
}) => {
  const panelHeader = (
    <h3>{`${date}, ${time}`}</h3>
  );
  return (
    <Panel header={panelHeader}>
      <h4 className="h5">{`${username} - ${emailId}`}</h4>
      <Well>
        {comment}
      </Well>
      <Button
        bsStyle="success"
        style={{ marginRight: 10 }}
        disabled={approved}>
          {approved ? 'Approved' : 'Approve'}
      </Button>
      <Button
        style={{ marginRight: 10 }}
        bsStyle="warning"
      >
        Edit
      </Button>
      { !!currentUserIsOwner &&
        <Button
          bsStyle="danger"
          id={commentId}
          onClick={onUserCommentDelete}
        >
          Delete
        </Button>
      }
    </Panel>
  );
};

Comment.propTypes = {
  emailId: PropTypes.string.isRequired,
  username: PropTypes.string,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  approved: PropTypes.bool,
  currentUserIsOwner: PropTypes.bool.isRequired,
  onUserCommentDelete: PropTypes.func.isRequired,
};

Comment.defaultProps = {
  approved: false,
};

export default Comment;
