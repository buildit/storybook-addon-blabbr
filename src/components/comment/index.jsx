import React, { PropTypes } from 'react';
import { Panel, Well, Button } from 'react-bootstrap';

const Comment = ({
  username,
  emailId,
  timestamp,
  comment,
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
  commentId: PropTypes.string.isRequired,
  currentUserIsOwner: PropTypes.bool.isRequired,
  onUserCommentEdit: PropTypes.func.isRequired,
  onUserCommentDelete: PropTypes.func.isRequired,
  edited: PropTypes.bool
};

export default Comment;
