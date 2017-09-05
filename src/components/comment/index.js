import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { createHash } from '../../utils';
import { ui as uiConfig, versions } from '../../utils/config';
import './styles.css';

const generateLink = (url, regex, target) => {
  if (url && regex && target) {
    const path = url.pathname;
    if (path && path !== '/' && regex) {
      const r = new RegExp(regex, 'i');
      const currentVersion = r.exec(path)[1];
      const result = url.pathname.replace(currentVersion, target);
      return `${url.protocol}//${url.hostname}:${url.port}${result}${url.search}${url.hash}`;
    }
  }

  return '#';
};

class Comment extends React.Component {
  constructor() {
    super();

    this.state = {
      showAvatar: false,
      regex: ''
    };
  }

  componentWillMount() {
    uiConfig().then(response => {
      if (response) {
        this.setState({
          showAvatar: response.avatar
        });
      }
    });
    versions().then(response => {
      if (response) {
        this.setState({
          regex: response.regex
        });
      }
    });
  }

  render() {
    const {
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
      activeVersion
    } = this.props;

    const emailHash = createHash(emailId);
    const output = marked(comment);
    const { showAvatar, regex } = this.state;

    const classes = showAvatar ? 'blabbr-comment withAvatar' : 'blabbr-comment';
    let url = '';
    if (window && window.parent) {
      url = window.parent.location;
    }

    return (
      <article className={classes}>
        <header>
          <h2>{`${username}`}</h2>

          <span className="blabbr-time">
            at <time dateTime={timestamp}>{timestamp}</time>
          </span>

          {version &&
            <span className="blabbr-version">
              about{' '}
              {version === activeVersion
                ? `v${version}`
                : <a href={generateLink(url, regex, version)}>v{version}</a>}
            </span>}

          {showAvatar &&
            <img
              className="avatar"
              src={`https://gravatar.com/avatar/${emailHash}?s=40&r=pg&d=retro`}
              alt={`${username}'s Gravatar`}
            />}

          <span className="controls">
            {!!currentUserIsOwner &&
              <button id={commentId} onClick={handleEditUserComment}>
                Edit
              </button>}
            {!!currentUserIsOwner &&
              <button
                id={commentId}
                onClick={handleDeleteUserComment}
                className="remove"
              >
                Remove
              </button>}
          </span>
        </header>
        <div dangerouslySetInnerHTML={{ __html: output }} />
        {edited && <p><small>(edited - {lastUpdated})</small></p>}
      </article>
    );
  }
}

Comment.propTypes = {
  emailId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  currentUserIsOwner: PropTypes.bool.isRequired,
  handleEditUserComment: PropTypes.func.isRequired,
  handleDeleteUserComment: PropTypes.func.isRequired,
  edited: PropTypes.bool,
  lastUpdated: PropTypes.string,
  version: PropTypes.string,
  activeVersion: PropTypes.string
};

Comment.defaultProps = {
  edited: false,
  lastUpdated: '',
  version: '',
  activeVersion: ''
};

export default Comment;
