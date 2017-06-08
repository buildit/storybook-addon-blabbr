import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import { createHash } from '../../utils';
import { versionLink } from '../../utils/url';
import { ui } from '../../utils/config'; // eslint-disable-line
import './styles.css';

const shouldShowAvatar = (ui) => {
  if (ui) {
    return !!ui.avatar
  }

  return true;
};

const Comment = ({
  username,
  emailId,
  timestamp,
  comment,
  currentUserIsOwner,
  commentId,
  handleEditUserComment,
  handleDeleteUserComment,
  edited,
  lastUpdated,
  version,
  activeVersion,
}) => {
  const emailHash = createHash(emailId);
  const output = marked(comment);

  const showAvatar = shouldShowAvatar(ui);
  const classes = showAvatar ? 'blabbr-comment withAvatar' : 'blabbr-comment';

  return (<article className={classes}>
    <header>
      <h2>{`${username}`}</h2>

      <span className="blabbr-time">at <time dateTime={timestamp}>{timestamp}</time></span>

      { version &&
        <span className="blabbr-version">about {
          (version === activeVersion) ? `v${version}` : <a href={versionLink(version)}>v{version}</a>
        }</span>
      }

      { showAvatar &&
        <img
          className="avatar"
          src={`https://gravatar.com/avatar/${emailHash}?s=40&r=pg&d=retro`}
          alt={`${username}'s Gravatar`}
        />
      }

      <span className="controls">
        { !!currentUserIsOwner &&
          <button id={commentId} onClick={handleEditUserComment}>
            Edit
          </button>
        }
        { !!currentUserIsOwner &&
          <button
            id={commentId}
            onClick={handleDeleteUserComment}
            className="remove"
          >
            Remove
          </button>
        }
      </span>
    </header>
    <div dangerouslySetInnerHTML={{ __html: output }} />
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
  handleEditUserComment: PropTypes.func.isRequired,
  handleDeleteUserComment: PropTypes.func.isRequired,
  edited: PropTypes.bool,
  lastUpdated: PropTypes.string,
  version: PropTypes.string,
  activeVersion: PropTypes.string,
};

export default Comment;
