import React, { PropTypes } from 'react';
import './styles.css';

const OnlineIndicator = ({
  isOnline,
}) => {
  const indicatorClass = isOnline ? 'status-indicator online' : 'status-indicator offline';
  return <span className={indicatorClass}>{ isOnline ? 'v' : 'x' }</span>;
};

OnlineIndicator.propTypes = {
  isOnline: PropTypes.bool,
};

OnlineIndicator.defaultProps = {
  isOnline: false,
};

export default OnlineIndicator;
