import React from 'react';
import PropTypes from 'prop-types';
import { version } from '../../utils/config';
import './styles.css';

const Versions = ({
  versions,
}) => {
  if (version && !versions) {
    return null;
  }

  const url = window.parent.location;

  return (
    <div id="blabbr-version-history">
      <div className="dropdown">
        <button className="dropbtn" >{version}</button>
        <div className="dropdown-content">
          {versions.map(v => (
            <a
              href={`${url.protocol}//${url.hostname}:${url.port}/${v}/${url.search}${url.hash}`}
              target="_parent"
            >
              {v}
            </a>))}
        </div>
      </div>
    </div>
  );
};

Versions.propTypes = {
  versions: PropTypes.array.isRequired,
};

export default Versions;
