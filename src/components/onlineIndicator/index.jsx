import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import './styles.css';

const OnlineIndicator = ({
  isOnline,
}) => {
  const indicatorClass = isOnline ? 'blabbr-status-indicator online' : 'blabbr-status-indicator offline';
  const tooltip = isOnline ? 'Online' : 'Could not connect to server';
  return (
    <div data-tip data-for="blabbr-indicator-tooltip" className={indicatorClass}>
      <ReactTooltip id="blabbr-indicator-tooltip" place="left" type="dark" effect="solid">
        {tooltip}
      </ReactTooltip>
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
