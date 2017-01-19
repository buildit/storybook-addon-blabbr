import React, { Component, PropTypes } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './style.less';
import { getComments, postComment } from '../api';
import { hasStorage } from '../../utils';
import Comments from '../comments';
import Register from '../register';
import SubmitComment from '../submitComment';

export default class Panel extends Component {
  constructor(...args) {
    super(...args);
    this.onStoryChangeHandler = this.onStoryChangeHandler.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onUserEmailChange = this.onUserEmailChange.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
    this.onUserCommentChange = this.onUserCommentChange.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.postComment = this.postComment.bind(this);

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
	  };
  }
  componentWillMount() {
    hasStorage('localStorage') && this.verifyUser();
  }
  componentDidMount() {
    const { storybook } = this.props;
    storybook.onStory && storybook.onStory((kind, story) => this.onStoryChangeHandler(kind, story));
  }
  onStoryChangeHandler(kind, story) {
    this.setState({
        activeComponent: kind,
        activeStory: story
    });
    this.fetchComments(kind, story);
    this.setState({ userComment: '' });
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
  onCommentSubmit(e) {
    const { userComment } = this.state;
    e.preventDefault();
    this.postComment(userComment);
  }
  postComment(userComment) {
    const {
      user: { userName, userEmail },
      activeComponent,
      activeStory,
      activeVersion,
      comments,
    } = this.state;

    postComment({
      userComment,
      userName,
      userEmail,
      component: activeComponent,
      story: activeStory,
      version: activeVersion,
    })
      .then((data) => {
        this.setState({
          comments: [data.comment, ...comments],
          userComment: ''
        });
      });
  }
  fetchComments(kind, story, version) {
    getComments(kind, story, version)
      .then(data => {
        this.setState({ comments: data.comments });
	  })
      .catch((e) => {});
  }
  render() {
    const {
      user: { userName, userEmail, isUserAuthenticated },
	    userComment,
        comments
    } = this.state;

    return (
      <section className="panel-container">

        { !!comments &&
          <Comments comments={comments} />
        }

        { !isUserAuthenticated &&
          <Register
            onUserNameChange={this.onUserNameChange}
            onUserEmailChange={this.onUserEmailChange}
            onRegisterSubmit={this.onRegisterSubmit}
            userName={userName}
            userEmail={userEmail} />
        }

        { !!isUserAuthenticated &&
          <SubmitComment
            userComment={userComment}
            onUserCommentChange={this.onUserCommentChange}
            onCommentSubmit={this.onCommentSubmit}
          />
        }

      </section>
	  );
  }
}

Panel.propTypes = {
  storybook: PropTypes.object,
  inline: PropTypes.bool,
};

Panel.defaultProps = {
  storybook: null,
  inline: true,
};
