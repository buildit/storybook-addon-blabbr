import React from 'react';

const Button = ({ disabled, label, onClick }) => (
  <button disabled={disabled} onClick={onClick}>
    {label}
  </button>
);

Button.displayName = 'Button';
Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  onClick: null,
};

export default Button;
