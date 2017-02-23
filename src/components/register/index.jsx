import React, { PropTypes } from 'react';
import { H3 } from '../typography/';
import PrimaryButton from '../button/primaryButton';
import { Label } from '../form-fields/Label';
import { Input } from '../form-fields/Input';
// import './styles.css';

const Register = ({
  onUserNameChange,
  onUserEmailChange,
  onRegisterSubmit,
  userName,
  userEmail,
}) => {
  const formTitle = (
    <H3>Register to add comments</H3>
  );

  return (
    <section className="blabbr-register">
      {formTitle}
      <form>
        <div>
          <Label htmlFor="blabbr-userName">
            User name:
          </Label>
          <Input
            id="blabbr-userName"
            value={userName || ''}
            onChange={onUserNameChange}
          />
        </div>
        <div>
          <Label htmlFor="blabbr-email">
            Email:
          </Label>
          <Input
            id="blabbr-email"
            value={userEmail || ''}
            onChange={onUserEmailChange}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <PrimaryButton
            type="submit"
            onClick={onRegisterSubmit}
            style={{ width: '50%', minWidth: '30%', marginTop: '2em' }}
          >
            Register
          </PrimaryButton>
        </div>
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
