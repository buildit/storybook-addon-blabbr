import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validation: {
        hasErrors: false,
        errors: {}
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
  }

  validateForm() {
    if (!username || username.length < 3) {
      
    }

    return false;
  }

  resetErrors() {
    this.setState({
      validation: {
        hasErrors: false,
        errors: {}
      }
    });
  }

  handleChange(event) {
    this.resetErrors();

    const { name, value } = event.target;
    this.props.handleChange(name, value);
  }

  handleSubmit(event) {
    event.preventDefault();

    const validationErrors = this.validateForm();

    if (!validationErrors) {
      this.props.handleSubmit();
      return;
    }

    this.setState({
      validation: {
        hasErrors: true,
        errors: validationErrors
      }
    });
  }

  render() {
    const {
      userName,
      onUserNameChange,
      userEmail,
      onUserEmailChange
    } = this.props;

    return (
      <section className="blabbr-register">
        <h2>Register to add comments</h2>
        <form>
          <div>
            <label htmlFor="blabbr-userName">
              Display name:
            </label>
            <input
              id="blabbr-userName"
              name="userName"
              type="text"
              value={userName || ''}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="blabbr-email">
              Email:
            </label>
            <input
              id="blabbr-email"
              name="userEmail"
              type="text"
              value={userEmail || ''}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            onClick={this.handleSubmit}
          >
            Register
          </button>
        </form>
      </section>
    );
  }
}

Register.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default Register;
