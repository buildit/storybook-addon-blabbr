import React, { PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import './styles.css';

const OnlineIndicator = ({
  userOnline
}) => {
  const indicatorClass = userOnline ? 'online' : 'offline';

  return (
    <div className={indicatorClass}>
        {
          userOnline ?
            <Glyphicon glyph="ok-sign" /> :
            <Glyphicon glyph="remove-sign" />
        }
    </div>
  );
};

OnlineIndicator.propTypes = {
  userOnline: PropTypes.bool
};

export default OnlineIndicator;
