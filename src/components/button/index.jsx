/**
 * Created by jonlazarini on 14/02/17.
 */
import React, { PropTypes, defaultProps } from 'react';


const Button = ({key, type, id, style, onClick, title, children, ...props}) => {
  return (
    <button {...props}
      key={key}
      type={type}
      id={id}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  )
};

Button.propTypes = {
  key: React.PropTypes.number,
  type: React.PropTypes.oneOf(["submit", "reset"]),
  title: React.PropTypes.string,
  id: React.PropTypes.number,
  onClick: React.PropTypes.func,
  children: React.PropTypes.string.isRequired
};

Button.defaultProps = {
  type: 'submit',
  title: 'button',
  onClick: null,
  children: 'Text button'
};


export default Button;
