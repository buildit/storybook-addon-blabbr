import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validation: {
        hasErrors: false,
        errors: []
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onRegisterSubmit();
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
              type="text"
              value={userName || ''}
              onChange={onUserNameChange}
            />
          </div>
          <div>
            <label htmlFor="blabbr-email">
              Email:
            </label>
            <input
              id="blabbr-email"
              type="text"
              value={userEmail || ''}
              onChange={onUserEmailChange}
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

/*const Register = ({
  onUserNameChange,
  onUserEmailChange,
  onRegisterSubmit,
  userName,
  userEmail,
}) => {
  const formTitle = (
    <h2>Register to add comments</h2>
  );

  return (
    <section className="blabbr-register">
      {formTitle}
      <form>
        <div>
          <label htmlFor="blabbr-userName">
            Display name:
          </label>
          <input
            id="blabbr-userName"
            type="text"
            value={userName || ''}
            onChange={onUserNameChange}
          />
        </div>
        <div>
          <label htmlFor="blabbr-email">
            Email:
          </label>
          <input
            id="blabbr-email"
            type="text"
            value={userEmail || ''}
            onChange={onUserEmailChange}
          />
        </div>
        <button
          type="submit"
          onClick={onRegisterSubmit}
        >
          Register
        </button>
      </form>
    </section>
  );
};*/


Register.propTypes = {
  onUserNameChange: PropTypes.func.isRequired,
  onUserEmailChange: PropTypes.func.isRequired,
  onRegisterSubmit: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default Register;
