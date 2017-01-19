import React, { PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Panel } from 'react-bootstrap';

const Register = ({
  onUserNickNameChange,
  onUserEmailChange,
  onRegisterSubmit,
  userNickName,
  userEmail
}) => {

  const formTitle = (
    <h2>Register to add comments</h2>
  );

  return (
    <Panel header={formTitle}>
      <form>

        <FormGroup>
          <ControlLabel htmlFor="nick-name">
            Nick name:
          </ControlLabel>
          <FormControl
            id="nick-name"
            value={userNickName || ''}
            onChange={onUserNickNameChange} />
        </FormGroup>

        <FormGroup>
          <ControlLabel htmlFor="email">
            Email:
          </ControlLabel>
          <FormControl
            id="email"
            value={userEmail || ''}
            onChange={onUserEmailChange} />
        </FormGroup>

        <Button
          type="submit"
          bsClass="btn btn-success"
          onClick={onRegisterSubmit}>
          Register
        </Button>

      </form>
    </Panel>
  );
};


Register.propTypes = {
  onUserNickNameChange: PropTypes.func.isRequired,
  onUserEmailChange: PropTypes.func.isRequired,
  onRegisterSubmit: PropTypes.func.isRequired,
  userNickName: PropTypes.string,
  userEmail: PropTypes.string,
};

export default Register;