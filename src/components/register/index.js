import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Register = ({
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
};


Register.propTypes = {
  onUserNameChange: PropTypes.func.isRequired,
  onUserEmailChange: PropTypes.func.isRequired,
  onRegisterSubmit: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default Register;
