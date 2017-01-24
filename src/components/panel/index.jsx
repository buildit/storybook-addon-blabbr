import React, { Component, PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import AlertContainer from 'react-alert';
import { getComments, postComment, deleteComment, updateComment } from '../api';
import { hasStorage, cleanToken } from '../../utils';
import Comments from '../comments';
import Register from '../register';
import SubmitComment from '../submitComment';
import db from '../api/db';

export default class Panel extends Component {
  constructor(...args) {
    super(...args);

    this.onFocusTabHandler = this.onFocusTabHandler.bind(this);
    this.props.channel.on('blabbrFocusTab', this.onFocusTabHandler);

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

	  this.state = {
        activeComponent: null,
        activeStory: null,
        activeVersion: null,
        user: {
            isUserAuthenticated: false,
            userName: '',
            userEmail: '',
        },
        userComment: '',
        comments: [],
        isShowingAllComments: true,
        userCommentBeingUpdated: null,
        commentIdBeingEditted: null
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
    this.flagActions = {
      add: false,
      remove: false,
      edit: false
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
  }

  componentWillUnmount() {
    if (this.commentChannelListener) {
      this.commentChannelListener.off();
      this.commentChannelListener = null;
    }
  }

  onFocusTabHandler() {
    // Focus the panel via the URL
    // Can we do this? There is nothing in API for it...
  }

  onStoryChangeHandler(kind, story) {
    this.setState({
      activeComponent: kind,
      activeStory: story,
    });
    this.fetchComments(kind, story);
    this.setState({ userComment: '' });
  }

  fetchComments(kind, story) {
    getComments(kind, story)
      .then((data) => {
        let comments = data.comments,
          commentsLength = comments.length,
          threshold = this.commentsThreshold,
          isShowingAllComments = true;

        this.allComments = comments ? comments.slice(0) : [];

        if (commentsLength > threshold) {
          this.filteredComments = comments ? comments.slice(0, threshold) : [];
          isShowingAllComments = false;
        }
        this.setState({
          comments: isShowingAllComments ? this.allComments : this.filteredComments,
          isShowingAllComments: isShowingAllComments
        });
        // add listener for channel comments events
        this.listenForCommentChanges();
      }).catch((e) => {
        msg.error(`Error: ${e.message}`);
      });
  }
  onShowAllComments() {
    this.setState({
      comments: this.allComments,
      isShowingAllComments: true
    });
  }

  listenForCommentChanges() {
    const { activeComponent, activeStory } = this.state;
    var componentId, stateId;

    componentId = cleanToken(activeComponent);
    stateId = cleanToken(activeStory);

    // remove listeners for previous comment stream
    if (this.commentChannelListener !== null) {
      this.commentChannelListener.off();
      this.commentChannelListener = null;
    }
    // register listeners
    // These listeners use flagActions to only fire if you're
    // not the current user
    this.commentChannelListener = db.ref('comments/' + componentId);
    // Note: The Child Added event is typically used when retrieving a
    // list of items (e.g. chat messages) in Firebase. Unlike 'value'
    // which fires for the entire contents of the location, 'child_added'
    // fires once for each immediate child and continues to trigger as
    // new children are added. Therefore we only want this function to
    // fire when new comments are added hence the use of our helper
    // function 'this.isNewComment'.
    this.commentChannelListener.on('child_added', function(data) {
      // data.key, data.val();
      if (data.val().stateId === stateId &&
        !this.flagActions.add &&
        this.isNewComment(data.key)) {
          msg.info('A new comment was added.');
      }
      this.flagActions.add = false;
    }.bind(this));

    this.commentChannelListener.on('child_changed', function(data) {
      if (data.val().stateId === stateId &&
        !this.flagActions.edit) {
        msg.info('A comment was editted.');
      }
      this.flagActions.edit = false;
    }.bind(this));

    this.commentChannelListener.on('child_removed', function(data) {
      if (data.val().stateId === stateId &&
        !this.flagActions.remove) {
        msg.info('A comment has been removed.');
      }
      this.flagActions.remove = false;
    }.bind(this));

    this.commentChannelListener.on('value', function(snapshot) {
      // only fire below events on change - not initial value subscriptions
      if (this.channelListening === false) {
        this.channelListening = true;
        return;
      }

      var updatedComments = [],
        commentsData,
        commentKey,
        snapShotKey,
        snapshotData = snapshot.val(),
        commentsLength,
        threshold = this.commentsThreshold,
        isShowingAllComments;

      for (snapShotKey in snapshotData) {
        // skip loop if the property is from prototype
        if (!snapshotData.hasOwnProperty(snapShotKey)) continue;

        commentsData = snapshotData[snapShotKey];

        // only update this channel
        if (commentsData.stateId !== stateId) {
          continue;
        }

        updatedComments.push({
          id: snapShotKey,
          ...commentsData
        });
      }

      commentsLength = updatedComments.length;
      isShowingAllComments = true;

      this.allComments = updatedComments.slice(0);

      if (commentsLength > threshold) {
        this.filteredComments = this.allComments.slice(0, threshold);
        isShowingAllComments = false;
      }

      this.setState({
        comments: isShowingAllComments ? this.allComments : this.filteredComments,
        isShowingAllComments: isShowingAllComments,
        userComment: ''
      });

    }.bind(this));
  }

  isNewComment(dataKey) {
    var comments = this.allComments,
      idFound = false,
      commentsLength,
      i;

    for (i = 0, commentsLength = comments.length; i < commentsLength; i++) {
      if (comments[i].id === dataKey) {
        idFound = true;
        break;
      }
    }
    return !idFound;
  }

  verifyUser() {
    const userName = localStorage.getItem('blabbr_userName');
    const userEmail = localStorage.getItem('blabbr_userEmail');
    userName && userEmail && this.setState({ user: { userName,  userEmail, isUserAuthenticated: true }});
  }

  registerUser(username, email) {
    const { user } = this.state;
    localStorage.setItem('blabbr_userName', username);
    localStorage.setItem('blabbr_userEmail', email);
    this.setState({ user: Object.assign(user, { isUserAuthenticated: true })});
  }

  onUserNameChange(e) {
    const { user } = this.state;
    this.setState({ user: Object.assign(user, { userName: e.target.value })});
  }

  onUserEmailChange(e) {
    const { user } = this.state;
    this.setState({ user: Object.assign(user, { userEmail: e.target.value })});
  }

  onRegisterSubmit(e) {
    const { user: { userName, userEmail } } =  this.state;
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
    this.addComment(userComment);
  }

  onUserCommentEdit(e) {
    e.preventDefault();
    this.setState({ commentIdBeingEditted: e.target.id });
    this.flagActions.edit = true;
  }
  onUserCommentEditCancel(e) {
    e.preventDefault();
    this.setState({ commentIdBeingEditted: null });
    this.flagActions.edit = false;
  }
  onUserCommentEditSave(e) {
    e.preventDefault();
    const { activeComponent, userCommentBeingUpdated } = this.state;

    updateComment(activeComponent, e.target.id, userCommentBeingUpdated).then((data) => {
        if (data.success) {
          msg.success(data.msg);
        } else {
          msg.error(data.msg)
        }
    });
    this.setState({ userCommentBeingUpdated : null, commentIdBeingEditted: null });
  }

  onUserCommentDelete(e) {
    const { activeComponent } = this.state;
    this.flagActions.remove = true;
    deleteComment(activeComponent, e.target.id).then((data) => {
        if (data.success) {
          msg.success(data.msg);
        } else {
          msg.error(data.msg)
        }
    });
  }

  addComment(userComment) {
    const {
      user: { userName, userEmail },
      activeComponent,
      activeStory,
      activeVersion,
      comments,
    } = this.state;

    this.flagActions.add = true;
    postComment({
      userComment,
      userName,
      userEmail,
      component: activeComponent,
      story: activeStory,
      version: activeVersion,
    }).then((data) => {
      if (data.success) {
        msg.success(data.msg);
      } else {
        msg.error(data.msg);
      }
    }).catch((error) => {
        msg.error('An error occured while attempting to post your comment.')
    });
  }

  render() {
    const {
      user: { userName, userEmail, isUserAuthenticated },
	    userComment,
      userCommentBeingUpdated,
      comments,
      commentIdBeingEditted,
      isShowingAllComments
    } = this.state;

    const commentCount = this.allComments.length;

    const commentCountView = commentCount ?
      (<span
        style={{
          fontSize: '13px',
          color: 'gray',
          float: 'right',
        }}
      >
        Total comments: { commentCount }
      </span>) :
      null;

    return (
      <section
        className="panel-container"
        style={{
          padding: '0 20px',
          width: '100%',
        }}
      >
        <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
        <h2>Comments { isUserAuthenticated && commentCountView }</h2>

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
            commentIdBeingEditted={commentIdBeingEditted}
            isShowingAllComments={isShowingAllComments}
            onShowAllComments={this.onShowAllComments}
          />
        }
      </section>
    );
  }
}

Panel.propTypes = {
  channel: PropTypes.object.isRequired,
  storybook: PropTypes.object.isRequired,
};
