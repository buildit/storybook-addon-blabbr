import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validation: {
        userName: false,
        userEmail: false
      }
    };
  }

  handleChange = event => {
    const { name, validity, value } = event.target;

    this.showInputError(name, validity);
    this.props.handleChange(name, value);
  };

  handleSubmit = event => {
    event.preventDefault();

    const invalidForm = Object.keys(this.state.validation).reduce(
      (accumulator, value) => accumulator || this.state.validation[value],
      false
    );

    if (!invalidForm) {
      this.props.handleSubmit();
    }
  };

  showInputError(name, validity) {
    if (!validity.valid) {
      this.setState({
        validation: Object.assign({}, this.state.validation, { [name]: true })
      });
    } else {
      this.setState({
        validation: Object.assign({}, this.state.validation, { [name]: false })
      });
    }
  }

  render() {
    const { userName, userEmail } = this.props;

    return (
      <section className="blabbr-register">
        <h2>Register to add comments</h2>
        <form>
          <div>
            <label id="userNameLabel" htmlFor="userName">
              Display name:
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              pattern=".{3,}"
              value={userName || ''}
              onChange={this.handleChange}
            />
            {!!this.state.validation.userName &&
              <div className="error">
                Display name must be at least 3 characters.
              </div>}
          </div>
          <div>
            <label id="userEmailLabel" htmlFor="userEmail">
              Email:
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              value={userEmail || ''}
              onChange={this.handleChange}
            />
            {!!this.state.validation.userEmail &&
              <div className="error">Please use a valid email address.</div>}
          </div>
          <button type="submit" onClick={this.handleSubmit}>
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
  userEmail: PropTypes.string.isRequired
};

export default Register;
