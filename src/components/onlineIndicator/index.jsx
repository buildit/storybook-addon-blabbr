import React, { PropTypes } from 'react';
import './styles.css';

const OnlineIndicator = ({
  isOnline,
}) => {
  const indicatorClass = isOnline ? 'online' : 'offline';

  return (
    <div className="status-indicator">
      <span>Connection status: </span>
      <span className={indicatorClass}>
        {
          isOnline ?
            <span>Online</span> :
            <span>Offline</span>
        }
      </span>
    </div>
  );
};

OnlineIndicator.propTypes = {
  isOnline: PropTypes.bool,
};

OnlineIndicator.defaultProps = {
  isOnline: false,
};

export default OnlineIndicator;
