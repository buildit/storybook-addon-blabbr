/**
 * Created by jonlazarini on 14/02/17.
 */
import React, { PropTypes, defaultProps } from 'react';


const Button = ({key, type, id, style, onClick, title, ...props}) => {
  return (
    <button
      {...props}
      key={key}
      type={type}
      id={id}
      style={style}
      onClick={onClick}
    >
      {title}
    </button>
  )
};

Button.propTypes = {
  title: PropTypes.string.isRequired
};

Button.defaultProps = {
  title: 'I am a string and required'
};

export default Button;
