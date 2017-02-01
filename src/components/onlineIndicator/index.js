import React, { PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import './styles.css';

const OnlineIndicator = ({
  isOnline
}) => {
  const indicatorClass = isOnline ? 'online' : 'offline';

  return (
    <div className="status-indicator">
      <span>Connection status: </span>
      <span className={indicatorClass}>
        {
          isOnline ?
            <span>Online <Glyphicon glyph="ok-sign" /></span> :
            <span>Offline <Glyphicon glyph="exclamation-sign" /></span>
        }
      </span>
    </div>
  );
};

OnlineIndicator.propTypes = {
  isOnline: PropTypes.bool
};

export default OnlineIndicator;
