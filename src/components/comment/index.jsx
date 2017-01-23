import React, { PropTypes } from 'react';
import { Panel, Well, Button } from 'react-bootstrap';

const Comment = ({
  username,
  emailId,
  timestamp,
  comment,
  approved,
  currentUserIsOwner,
  commentId,
  onUserCommentEdit,
  onUserCommentDelete,
  edited,
  lastUpdated
}) => {
  const panelHeader = (
    <h3>{timestamp}</h3>
  );
  return (
    <Panel header={panelHeader}>
      <h4 className="h5">{`${username} - ${emailId}`}</h4>
      <Well>
        {comment} {edited && <span className="text-muted"><br/>(edited - {lastUpdated})</span>}
      </Well>
      <Button
        bsStyle="success"
        style={{ marginRight: 10 }}
        disabled={approved}>
          {approved ? 'Approved' : 'Approve'}
      </Button>
      { !!currentUserIsOwner &&
        <Button
          style={{ marginRight: 10 }}
          bsStyle="warning"
          id={commentId}
          onClick={onUserCommentEdit}
        >
          Edit
        </Button>
      }
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
  timestamp: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  approved: PropTypes.bool,
  commentId: PropTypes.string.isRequired,
  currentUserIsOwner: PropTypes.bool.isRequired,
  onUserCommentEdit: PropTypes.func.isRequired,
  onUserCommentDelete: PropTypes.func.isRequired,
  edited: PropTypes.bool
};

Comment.defaultProps = {
  approved: false,
};

export default Comment;
