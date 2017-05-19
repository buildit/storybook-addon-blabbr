import React, { Component, PropTypes } from 'react';
import AlertContainer from 'react-alert';
import { getComments, postComment, deleteComment, updateComment } from '../api';
import { hasStorage, cleanToken } from '../../utils';
import Comments from '../comments';
import Register from '../register';
import SubmitComment from '../submitComment';
import OnlineIndicator from '../onlineIndicator';
import { dbEventManager } from '../api/db';
import { version } from 'blabbr-config'; // eslint-disable-line
import './styles.css';

function wasActionPerformedByMe(key, obj) {
  const isKeyFound = obj.hasOwnProperty(key); // eslint-disable-line no-prototype-builtins
  if (isKeyFound) {
    delete obj[key]; // eslint-disable-line no-param-reassign
  }
  return isKeyFound;
}

export default class Panel extends Component {
  constructor(...args) {
    super(...args);

    // this.onFocusTabHandler = this.onFocusTabHandler.bind(this);
    // this.props.channel.on('blabbrFocusTab', this.onFocusTabHandler);

    this.onStoryChangeHandler = this.onStoryChangeHandler.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.listenForCommentChanges = this.listenForCommentChanges.bind(this);
    this.onUserEmailChange = this.onUserEmailChange.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.onUserCommentChange = this.onUserCommentChange.bind(this);
    this.onUserCommentEditCancel = this.onUserCommentEditCancel.bind(this);
    this.onUserCommentEditSave = this.onUserCommentEditSave.bind(this);
    this.onUserCommentUpdate = this.onUserCommentUpdate.bind(this);
    this.onUserCommentEdit = this.onUserCommentEdit.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.addComment = this.addComment.bind(this);
    this.onUserCommentDelete = this.onUserCommentDelete.bind(this);
    this.onShowAllComments = this.onShowAllComments.bind(this);
    this.updateView = this.updateView.bind(this);
    this.isNewComment = this.isNewComment.bind(this);
    this.isAddedByMe = this.isAddedByMe.bind(this);
    this.isEditedByMe = this.isEditedByMe.bind(this);
    this.isDeletedByMe = this.isDeletedByMe.bind(this);
    this.handleOnlineStatusChange = this.handleOnlineStatusChange.bind(this);
    this.processComments = this.processComments.bind(this);

    this.state = {
      activeComponent: null,
      activeStory: null,
      activeVersion: null,
      eventName: null,
      user: {
        isUserAuthenticated: false,
        userName: '',
        userEmail: '',
      },
      userComment: '',
      comments: [],
      isShowingAllComments: true,
      userCommentBeingUpdated: null,
      commentIdBeingEdited: null,
      isUserOnline: navigator.onLine,
    };

    this.commentChannelListener = null;
    this.channelListening = false;
    this.alertOptions = {
      offset: 14,
      position: 'bottom right',
      theme: 'light',
      time: 3000,
      transition: 'fade',
    };
    // track user actions
    this.userActions = {
      added: {},
      removed: {},
      edited: {},
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
    storybook.onStory && storybook.onStory((kind, story) => this.onStoryChangeHandler(kind, story));
    dbEventManager.addOnlineListener();
    dbEventManager.subscribe('online', 'dbOnline', this.handleOnlineStatusChange);
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

  // onFocusTabHandler() {
  //   // Focus the panel via the URL
  //   // Can we do this? There is nothing in API for it...
  // }

  onUserNameChange(e) {
    const { user } = this.state;
    this.setState({ user: Object.assign(user, { userName: e.target.value }) });
  }

  onUserEmailChange(e) {
    const { user } = this.state;
    this.setState({ user: Object.assign(user, { userEmail: e.target.value }) });
  }

  onRegisterSubmit(e) {
    const { user: { userName, userEmail } } = this.state;
    e.preventDefault();
    this.registerUser(userName, userEmail);
  }

  onUserCommentChange(e) {
    this.setState({ userComment: e.target.value });
  }

  onUserCommentUpdate(e) {
    this.setState({ userCommentBeingUpdated: e.target.value });
  }

  onCommentSubmit(e) {
    const { userComment } = this.state;
    e.preventDefault();
    e.stopPropagation();

    this.addComment(userComment && userComment.trim());
    this.setState({ userComment: '' });
  }

  onUserCommentEdit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ commentIdBeingEdited: e.target.id });
    const commentBeingEdited = this.allComments.find((comment) => {
      return comment._id === e.target.id;
    });
    this.setState({ userCommentBeingUpdated: commentBeingEdited.comment });
    this.userActions.edited[e.target.id] = true;
  }

  onUserCommentEditCancel(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ commentIdBeingEdited: null });
    delete this.userActions.edited[e.target.id];
  }

  onUserCommentEditSave(e) {
    e.preventDefault();
    e.stopPropagation();

    const { userCommentBeingUpdated } = this.state;

    updateComment(e.target.id, userCommentBeingUpdated).then((data) => {
      if (data.success) {
        global.msg.success(data.msg);
      } else {
        global.msg.error(data.msg);
      }
    });
    this.setState({ userCommentBeingUpdated: null, commentIdBeingEdited: null });
  }

  onUserCommentDelete(e) {
    e.preventDefault();
    e.stopPropagation();

    this.userActions.removed[e.target.id] = true;
    deleteComment(e.target.id).then((data) => {
      if (data.success) {
        global.msg.success(data.msg);
      } else {
        global.msg.error(data.msg);
      }
    });
  }

  onShowAllComments() {
    this.setState({
      comments: this.allComments,
      isShowingAllComments: true,
    });
  }

  onStoryChangeHandler(kind, story) {
    const activeVersion = version;
    const activeComponent = cleanToken(kind);
    const activeStory = cleanToken(story);

    this.setState({
      activeComponent,
      activeStory,
      activeVersion,
      eventName: `${activeComponent}${activeStory}`,
      userComment: '',
      comments: [],
    });
    this.filteredComments = [];
    this.allComments = [];

    this.fetchComments(activeComponent, activeStory, activeVersion);
  }

  isDeletedByMe(dataKey) {
    return wasActionPerformedByMe(dataKey, this.userActions.removed);
  }

  isEditedByMe(dataKey) {
    return wasActionPerformedByMe(dataKey, this.userActions.edited);
  }

  isAddedByMe(dataKey) {
    return wasActionPerformedByMe(dataKey, this.userActions.added);
  }

  isNewComment(dataKey) {
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
  }

  processComments(data) {
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
      isShowingAllComments,
    });
  }

  listenForCommentChanges(activeComponent, activeStory, activeVersion) {
    const { eventName } = this.state;
    // remove listeners for previous comment stream
    if (this.commentChannelListener !== null) {
      dbEventManager.unsubscribe('change', this.commentChannelListener);
      this.commentChannelListener = null;
    }
    // register listeners
    // These listeners use userActions to only fire if you're
    // not the current user
    this.commentChannelListener = dbEventManager.subscribe('change', eventName, (change) => {
      const changedDoc = change.doc;
      const changedRecordId = changedDoc._id;
      const isDeleted = !!changedDoc._deleted;
      const isNewRecord = this.isNewComment(changedRecordId);

      if (isDeleted && !this.isDeletedByMe(changedRecordId)) {
        global.msg.info('A comment has been removed.');
      } else if (!isDeleted && isNewRecord && !this.isAddedByMe(changedRecordId)) {
        global.msg.info('A new comment was added.');
      } else if (!isDeleted && !isNewRecord && !this.isEditedByMe(changedRecordId)) {
        global.msg.info('A comment was edited.');
      }
      console.log('added2');
      this.updateView(activeComponent, activeStory, activeVersion);
    });
  }

  verifyUser() {
    const userName = localStorage.getItem('blabbr_userName');
    const userEmail = localStorage.getItem('blabbr_userEmail');
    userName && userEmail &&
      this.setState({ user: { userName, userEmail, isUserAuthenticated: true } });
  }

  registerUser(username, email) {
    const { user,
      activeComponent,
      activeStory,
      activeVersion,
    } = this.state;

    localStorage.setItem('blabbr_userName', username);
    localStorage.setItem('blabbr_userEmail', email);
    this.setState({ user: Object.assign(user, { isUserAuthenticated: true }) });
    this.updateView(activeComponent, activeStory, activeVersion);
    this.listenForCommentChanges(activeComponent, activeStory, activeVersion);
  }

  fetchComments(activeComponent, activeStory, activeVersion) {
    const { user } = this.state;

    if (user.isUserAuthenticated) {
      this.updateView(activeComponent, activeStory, activeVersion);
      this.listenForCommentChanges(activeComponent, activeStory, activeVersion);
    }
  }

  updateView(activeComponent, activeStory, activeVersion) {
    getComments(activeComponent, activeStory, activeVersion)
      .then((data) => {
        this.processComments(data);
      }).catch((e) => {
        global.msg.error(`Error: ${e.message}`);
      });
  }

  handleOnlineStatusChange(data) {
    this.setState({
      isUserOnline: data.isOnline,
    });
  }

  addComment(userComment) {
    const {
      user: { userName, userEmail },
      activeComponent,
      activeStory,
      activeVersion,
      eventName,
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
      version: activeVersion || '0_0_1',
      eventName,
    }).then((data) => {
      if (data.success) {
        global.msg.success(data.msg);
      } else {
        global.msg.error(data.msg);
      }
      console.log('added1');
      this.updateView(activeComponent, activeStory, activeVersion);
      this.listenForCommentChanges(activeComponent, activeStory, activeVersion);
    }).catch(() => {
      global.msg.error('An error occured while attempting to post your comment.');
    });

    this.setState({ userComment: '' });
  }

  render() {
    const {
      user: { userName, userEmail, isUserAuthenticated },
      userComment,
      userCommentBeingUpdated,
      comments,
      commentIdBeingEdited,
      isShowingAllComments,
      isUserOnline,
    } = this.state;

    const commentCount = this.allComments.length;

    const commentCountView = commentCount ?
      <span className="comment-count text-muted tile">{ commentCount }</span> : null;

    return (
      <section className="blabbr-panel-container">
        <AlertContainer ref={a => (global.msg = a)} {...this.alertOptions} />
        <ul className="tiles">
          <li>{ isUserAuthenticated && commentCountView }</li>
          <li><OnlineIndicator isOnline={isUserOnline} /></li>
        </ul>

        { !isUserAuthenticated &&
          <Register
            onUserNameChange={this.onUserNameChange}
            onUserEmailChange={this.onUserEmailChange}
            onRegisterSubmit={this.onRegisterSubmit}
            userName={userName}
            userEmail={userEmail}
          />
        }

        { !!isUserAuthenticated &&
          <SubmitComment
            userComment={userComment}
            onUserCommentChange={this.onUserCommentChange}
            onCommentSubmit={this.onCommentSubmit}
          />
        }

        { !!isUserAuthenticated && !!comments &&
          <Comments
            userCommentBeingUpdated={userCommentBeingUpdated}
            onUserCommentUpdate={this.onUserCommentUpdate}
            onUserCommentEdit={this.onUserCommentEdit}
            onUserCommentEditSave={this.onUserCommentEditSave}
            onUserCommentEditCancel={this.onUserCommentEditCancel}
            onUserCommentDelete={this.onUserCommentDelete}
            currentUser={userEmail}
            comments={comments}
            commentIdBeingEdited={commentIdBeingEdited}
            isShowingAllComments={isShowingAllComments}
            onShowAllComments={this.onShowAllComments}
          />
        }
      </section>
    );
  }
}

Panel.propTypes = {
  // channel: PropTypes.object.isRequired,
  storybook: PropTypes.object.isRequired,
};
