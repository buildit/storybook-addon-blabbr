import React, { PropTypes } from 'react';
import { createHash } from '../../utils';
import './styles.css';
import PrimaryButton from '../button/primaryButton';
import SecondaryButton from '../button/secondaryButton';
import { HyperLink } from '../typography/';

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
}) => {
  const emailHash = createHash(emailId);
  return (<article className="blabbr-comment">
    <header>
      <h2>{`${username}`}</h2>
      <time dateTime={timestamp}>{timestamp}</time>
      <img className="avatar" src={`https://gravatar.com/avatar/${emailHash}?s=40&r=pg&d=retro`} alt={`${username}'s Gravatar`} />

      <span className="controls">
        { !!currentUserIsOwner &&
          <SecondaryButton id={commentId} onClick={onUserCommentEdit}>
            Edit
          </SecondaryButton>
        }
        { !!currentUserIsOwner &&
        <HyperLink
          id={commentId}
          onClick={onUserCommentDelete}
        >
              Remove
            </HyperLink>
          }
      </span>
    </header>
    <p>{comment}</p>
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
};

export default Comment;
