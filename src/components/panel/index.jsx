import React, { Component, PropTypes } from 'react';
import 'material-design-lite/material.min.css';
import './style.less';
import { getComments } from '../api';
import { hasStorage } from '../../utils';
import Comments from '../comments';
import Register from '../register';
import SubmitComment from '../submitComment';

export default class Panel extends Component {
  constructor(...args) {
    super(...args);
    this.onStoryChangeHandler = this.onStoryChangeHandler.bind(this);
    this.fetchComments = this.fetchComments.bind(this);
    this.onUserNickNameChange = this.onUserNickNameChange.bind(this);
    this.onUserEmailChange = this.onUserEmailChange.bind(this);
    this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
    this.verifyUser = this.verifyUser.bind(this);

    this.state = {
      activeComponent: null,
      activeStory: null,
      activeVersion: null,
      user: {
        isUserAuthenticated: null,
        userNickName: null,
        userEmail: null,
      },
      userComment: null,
      comments: null,
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
  }
  verifyUser() {
    const userNickName = localStorage.getItem('blabbr_userNickName');
    const userEmail = localStorage.getItem('blabbr_userEmail');
    userNickName && userEmail && this.setState({ user: { userNickName,  userEmail, isUserAuthenticated: true }});
  }
  registerUser(nickname, email) {
    const { user } = this.state;
    localStorage.setItem('blabbr_userNickName', nickname);
    localStorage.setItem('blabbr_userEmail', email);
    this.setState({ user: Object.assign(user, { isUserAuthenticated: true })});
  }
  onUserNickNameChange(e) {
    const { user } = this.state;
    this.setState({ user: Object.assign(user, { userNickName: e.target.value })});
  }
  onUserEmailChange(e) {
    const { user } = this.state;
    this.setState({ user: Object.assign(user, { userEmail: e.target.value })});
  }
  onRegisterSubmit(e) {
    const { user: { userNickName, userEmail } } =  this.state;
    e.preventDefault();
    this.registerUser(userNickName, userEmail);
  }
  fetchComments(kind, story, version) {
    getComments(kind, story, version)
      .then(data => {
        this.setState({ comments: data.comments });
	  });
  }
  render() {
    const {
      user: { userNickName, userEmail, isUserAuthenticated },
      comments
    } = this.state;

    return (
          <section className="panel-container">

	          { !!comments &&
                <Comments comments={comments} />
	          }

			  { !isUserAuthenticated &&
                <Register
                  onUserNickNameChange={this.onUserNickNameChange}
                  onUserEmailChange={this.onUserEmailChange}
                  onRegisterSubmit={this.onRegisterSubmit}
                  userNickName={userNickName}
                  userEmail={userEmail} />
			  }

			  { !!isUserAuthenticated &&
                <SubmitComment />
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
