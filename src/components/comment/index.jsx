import React, { PropTypes } from 'react';
import { createHash } from '../../utils';
import { Panel, Glyphicon, Button } from 'react-bootstrap';
import './styles.css';

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
  const emailHash = createHash(emailId);
  const panelHeader = (
    <div>
      <img className="avatar" src={`https://gravatar.com/avatar/${emailHash}?s=40&r=pg&d=retro`} />
      <h4 className="header">{`${username} - ${emailId}`} <span className="text-muted">{timestamp}</span></h4>
      <span className="controls">
        { !!currentUserIsOwner &&
          <Button
            style={{ marginRight: 10 }}
            bsStyle="warning"
            id={commentId}
            onClick={onUserCommentEdit}
            title="Edit"
          >
            <Glyphicon
              id={commentId}
              onClick={onUserCommentEdit}
              glyph="pencil"></Glyphicon>
          </Button>
        }
        { !!currentUserIsOwner &&
          <Button
            bsStyle="danger"
            id={commentId}
            onClick={onUserCommentDelete}
            title="Remove"
          >
            <Glyphicon
              id={commentId}
              onClick={onUserCommentDelete}
              glyph="remove"></Glyphicon>
          </Button>
        }
      </span>
    </div>
  );
  return (
    <Panel header={panelHeader}>
      {comment} {edited && <span className="text-muted"><br/>(edited - {lastUpdated})</span>}
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
