import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Versions = (currentVersion) => {
  return (
    <div id="blabbr-version-history">
      <div class="dropdown">
        <button class="dropbtn" id="blabbr-version-history-dropbtn">Versions</button>
        <div class="dropdown-content" id="blabbr-version-history-dropdown-content">
        </div>
      </div>
    </div>
  );
};

SubmitComment.propTypes = {
  onUserCommentChange: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
  userComment: PropTypes.string,
  type: PropTypes.string,
  comment: PropTypes.object,
  onCommentCancel: PropTypes.func,
  title: PropTypes.string,
};

export default Versions;
