import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AlertContainer from 'react-alert';
import {
  getComments,
  postComment,
  deleteComment,
  updateComment
} from '../../api';
import { hasStorage, cleanToken } from '../../utils';
import Comments from '../comments';
import Register from '../register';
import SubmitComment from '../submitComment';
import OnlineIndicator from '../onlineIndicator';
import { dbEventManager } from '../../api/db';
import { version } from '../../utils/config'; // eslint-disable-line
import './styles.css';

function wasActionPerformedByMe(key, obj) {
  const isKeyFound = obj.hasOwnProperty(key); // eslint-disable-line no-prototype-builtins
  if (isKeyFound) {
    delete obj[key]; // eslint-disable-line no-param-reassign
  }
  return isKeyFound;
}

const extractVersions = data => {
  const entries = (data && data.map(item => item.version)) || [];
  return new Set(entries);
};

export default class Panel extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      activeComponent: null,
      activeStory: null,
      activeVersion: version || '',
      eventName: null,
      user: {
        isUserAuthenticated: false,
        userName: '',
        userEmail: ''
      },
      userComment: '',
      comments: [],
      isShowingAllComments: true,
      userCommentBeingUpdated: null,
      commentIdBeingEdited: null,
      isUserOnline: navigator.onLine,
      serverVersions: [],
      versions: []
    };

    this.commentChannelListener = null;
    this.channelListening = false;
    this.alertOptions = {
      offset: 14,
      position: 'bottom right',
      theme: 'light',
      time: 3000,
      transition: 'fade'
    };

    this.userActions = {
      added: {},
      removed: {},
      edited: {}
    };
    this.commentsThreshold = 5;
    this.filteredComments = [];
    this.allComments = [];
  }

  componentWillMount() {
    hasStorage('localStorage') && this.verifyUser();
  }

  componentDidMount() {
    const { storybook } = this.props;
    storybook.onStory &&
      storybook.onStory((kind, story) =>
        this.onStoryChangeHandler(kind, story)
      );
    dbEventManager.addOnlineListener();
    dbEventManager.subscribe(
      'online',
      'dbOnline',
      this.handleOnlineStatusChange
    );
  }

  componentWillUnmount() {
    if (this.commentChannelListener) {
      dbEventManager.unsubscribe('change', this.commentChannelListener);
      this.commentChannelListener = null;
    }
    if (this.isUserOnlineListener) {
      dbEventManager.unsubscribe('online', 'dbOnline');
    }
    dbEventManager.removeOnlineListener();
  }

  onStoryChangeHandler = (kind, story) => {
    const activeComponent = cleanToken(kind);
    const activeStory = cleanToken(story);

    this.setState({
      activeComponent,
      activeStory,
      eventName: `${activeComponent}${activeStory}`,
      userComment: '',
      comments: []
    });
    this.filteredComments = [];
    this.allComments = [];

    this.fetchComments(activeComponent, activeStory, this.state.activeVersion);
  };

  handleRegisterChange = (key, value) => {
    const { user } = this.state;

    this.setState({
      user: Object.assign({}, user, { [key]: value })
    });
  };

  handleRegisterSubmit = () => {
    const { user: { userName, userEmail } } = this.state;

    this.registerUser(userName, userEmail);
  };

  handleNewUserCommentChange = userComment => {
    this.setState({ userComment });
  };

  handleNewUserCommentSubmit = () => {
    const { userComment } = this.state;

    this.addComment(userComment && userComment.trim());
    this.setState({ userComment: '' });
  };

  handleEditUserComment = event => {
    event.preventDefault();
    event.stopPropagation();

    this.setState({ commentIdBeingEdited: event.target.id });
    const commentBeingEdited = this.allComments.find(
      comment => comment._id === event.target.id
    );
    this.setState({ userCommentBeingUpdated: commentBeingEdited.comment });
    this.userActions.edited[event.target.id] = true;
  };

  handleEditUserCommentChange = userComment => {
    this.setState({ userCommentBeingUpdated: userComment });
  };

  handleEditUserCommentSubmit = commentId => {
    const { userCommentBeingUpdated } = this.state;

    this.editComment(commentId, userCommentBeingUpdated);

    this.setState({
      userCommentBeingUpdated: null,
      commentIdBeingEdited: null
    });
  };

  handleEditUserCommentCancel = event => {
    event.preventDefault();
    event.stopPropagation();

    this.setState({ commentIdBeingEdited: null });
    delete this.userActions.edited[event.target.id];
  };

  handleDeleteUserComment = event => {
    event.preventDefault();
    event.stopPropagation();

    this.userActions.removed[event.target.id] = true;
    deleteComment(event.target.id).then(data => {
      if (data.success) {
        global.msg.success(data.msg);
      } else {
        global.msg.error(data.msg);
      }
    });
  };

  handleShowAllComments = () => {
    this.setState({
      comments: this.allComments,
      isShowingAllComments: true
    });
  };

  isDeletedByMe = dataKey =>
    wasActionPerformedByMe(dataKey, this.userActions.removed);

  isEditedByMe = dataKey =>
    wasActionPerformedByMe(dataKey, this.userActions.edited);

  isAddedByMe = dataKey =>
    wasActionPerformedByMe(dataKey, this.userActions.added);

  isNewComment = dataKey => {
    const comments = this.allComments;
    let idFound = false;
    let commentsLength;
    let i;

    for (i = 0, commentsLength = comments.length; i < commentsLength; i++) {
      if (comments[i]._id === dataKey) {
        idFound = true;
        break;
      }
    }
    return !idFound;
  };

  processServerVersions = data => {
    this.setState({ serverVersions: data });
  };

  processComments = data => {
    const comments = data.docs;
    const commentsLength = comments.length;
    const threshold = this.commentsThreshold;
    let isShowingAllComments = true;

    this.allComments = comments ? comments.slice(0) : [];

    if (commentsLength > threshold) {
      this.filteredComments = comments ? comments.slice(0, threshold) : [];
      isShowingAllComments = false;
    }
    this.setState({
      comments: isShowingAllComments ? this.allComments : this.filteredComments,
      versions: [...extractVersions(comments)],
      isShowingAllComments
    });
  };

  listenForCommentChanges = (activeComponent, activeStory, activeVersion) => {
    const { eventName } = this.state;
    // remove listeners for previous comment stream
    if (this.commentChannelListener !== null) {
      dbEventManager.unsubscribe('change', this.commentChannelListener);
      this.commentChannelListener = null;
    }
    // register listeners
    // These listeners use userActions to only fire if you're
    // not the current user
    this.commentChannelListener = dbEventManager.subscribe(
      'change',
      eventName,
      change => {
        const changedDoc = change.doc;
        const changedRecordId = changedDoc._id;
        const isDeleted = !!changedDoc._deleted;
        const isNewRecord = this.isNewComment(changedRecordId);

        if (isDeleted && !this.isDeletedByMe(changedRecordId)) {
          global.msg.info('A comment has been removed.');
        } else if (
          !isDeleted &&
          isNewRecord &&
          !this.isAddedByMe(changedRecordId)
        ) {
          global.msg.info('A new comment was added.');
        } else if (
          !isDeleted &&
          !isNewRecord &&
          !this.isEditedByMe(changedRecordId)
        ) {
          global.msg.info('A comment was edited.');
        }
        this.updateView(activeComponent, activeStory, activeVersion);
      }
    );
  };

  verifyUser = () => {
    const userName = localStorage.getItem('blabbr_userName');
    const userEmail = localStorage.getItem('blabbr_userEmail');
    userName &&
      userEmail &&
      this.setState({
        user: { userName, userEmail, isUserAuthenticated: true }
      });
  };

  registerUser(username, email) {
    const { user, activeComponent, activeStory, activeVersion } = this.state;

    localStorage.setItem('blabbr_userName', username);
    localStorage.setItem('blabbr_userEmail', email);
    this.setState({ user: Object.assign(user, { isUserAuthenticated: true }) });
    this.updateView(activeComponent, activeStory, activeVersion);
    this.listenForCommentChanges(activeComponent, activeStory, activeVersion);
  }

  fetchComments = (activeComponent, activeStory, activeVersion) => {
    const { user } = this.state;

    if (user.isUserAuthenticated) {
      this.updateView(activeComponent, activeStory, activeVersion);
      this.listenForCommentChanges(activeComponent, activeStory, activeVersion);
    }
  };

  updateView = (activeComponent, activeStory, activeVersion) => {
    getComments(activeComponent, activeStory, activeVersion)
      .then(data => {
        this.processComments(data);
      })
      .catch(error => {
        global.msg.error(`Error: ${error.message}`);
      });
  };

  handleOnlineStatusChange = data => {
    this.setState({
      isUserOnline: data.isOnline
    });
  };

  addComment = userComment => {
    const {
      user: { userName, userEmail },
      activeComponent,
      activeStory,
      activeVersion,
      eventName
    } = this.state;
    const timestampId = `${new Date().getTime()}`;

    this.userActions.added[timestampId] = true;
    postComment({
      timestampId,
      userComment,
      userName,
      userEmail,
      component: activeComponent,
      story: activeStory,
      version: activeVersion,
      eventName
    })
      .then(data => {
        if (data.success) {
          global.msg.success(data.msg);
        } else {
          global.msg.error(data.msg);
        }
        this.updateView(activeComponent, activeStory, activeVersion);
        this.listenForCommentChanges(
          activeComponent,
          activeStory,
          activeVersion
        );
      })
      .catch(() => {
        global.msg.error(
          'An error occured while attempting to post your comment.'
        );
      });

    this.setState({ userComment: '' });
  };

  editComment = (commentId, editedComment) => {
    const { activeComponent, user: { userName, userEmail } } = this.state;

    updateComment({
      commentId,
      component: activeComponent,
      userCommentText: editedComment,
      userEmail,
      userName
    }).then(data => {
      if (data.success) {
        global.msg.success(data.msg);
      } else {
        global.msg.error(data.msg);
      }
    });
  };

  render() {
    const {
      user: { userName, userEmail, isUserAuthenticated },
      userComment,
      userCommentBeingUpdated,
      comments,
      commentIdBeingEdited,
      isShowingAllComments,
      isUserOnline,
      activeVersion,
      versions
    } = this.state;

    const commentCount = this.allComments.length;

    const commentCountView = commentCount
      ? <span className="comment-count text-muted tile">{commentCount}</span>
      : null;

    return (
      <section className="blabbr-panel-container">
        <AlertContainer ref={a => (global.msg = a)} {...this.alertOptions} />
        <ul className="tiles">
          <li>{isUserAuthenticated && commentCountView}</li>
          <li><OnlineIndicator isOnline={isUserOnline} /></li>
        </ul>

        {!isUserAuthenticated &&
          <Register
            userName={userName}
            userEmail={userEmail}
            handleChange={this.handleRegisterChange}
            handleSubmit={this.handleRegisterSubmit}
          />}

        {!!isUserAuthenticated &&
          <SubmitComment
            userComment={userComment}
            handleChange={this.handleNewUserCommentChange}
            handleSubmit={this.handleNewUserCommentSubmit}
          />}

        {!!isUserAuthenticated &&
          !!comments &&
          <Comments
            userCommentBeingUpdated={userCommentBeingUpdated}
            handleEditUserComment={this.handleEditUserComment}
            handleEditUserCommentChange={this.handleEditUserCommentChange}
            handleEditUserCommentSubmit={this.handleEditUserCommentSubmit}
            handleEditUserCommentCancel={this.handleEditUserCommentCancel}
            handleDeleteUserComment={this.handleDeleteUserComment}
            currentUser={userEmail}
            comments={comments}
            activeVersion={activeVersion}
            versions={versions}
            commentIdBeingEdited={commentIdBeingEdited}
            isShowingAllComments={isShowingAllComments}
            handleShowAllComments={this.handleShowAllComments}
          />}
      </section>
    );
  }
}

Panel.propTypes = {
  // channel: PropTypes.object.isRequired,
  storybook: PropTypes.object.isRequired
};
