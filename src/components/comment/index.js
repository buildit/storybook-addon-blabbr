import React, { PropTypes } from 'react';
import { createHash, formatToHTML } from '../../utils';
import { ui } from 'blabbr-config'; // eslint-disable-line
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
  lastUpdated,
  version,
}) => {
  const emailHash = createHash(emailId);
  const output = formatToHTML(comment);

  let showAvatar;
  if (ui) {
    showAvatar = !!ui.avatar;
  } else {
    showAvatar = true;
  }

  let classes = 'blabbr-comment';
  if (showAvatar) {
    classes += ' withAvatar';
  }

  return (<article className={classes}>
    <header>
      <h2>{`${username} v${version}`}</h2>
      <time dateTime={timestamp}>{timestamp}</time>
      { showAvatar &&
        <img
          className="avatar"
          src={`https://gravatar.com/avatar/${emailHash}?s=40&r=pg&d=retro`}
          alt={`${username}'s Gravatar`}
        />
      }

      <span className="controls">
        { !!currentUserIsOwner &&
          <button id={commentId} onClick={onUserCommentEdit}>
            Edit
          </button>
        }
        { !!currentUserIsOwner &&
        <button
          id={commentId}
          onClick={onUserCommentDelete}
        >
              Remove
            </button>
          }
      </span>
    </header>
    {output}
    {edited && <p><small>(edited - {lastUpdated})</small></p>}
  </article>);
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
  edited: PropTypes.bool,
  lastUpdated: PropTypes.string,
  version: PropTypes.string,
};

export default Comment;
