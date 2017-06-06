import React from 'react';
import PropTypes from 'prop-types';
import { version } from '../../utils/config';
import './styles.css';

const Versions = ({
  versions,
}) => {
  if (!version || !versions || (versions && versions.length === 0)) {
    return null;
  }

  const url = window.parent.location;
  let counter = 0;

  // We are reversing the versions array as the assumption is that
  // newer versions are appended to the bottom of the file
  return (
    <div id="blabbr-version-history">
      <div className="dropdown">
        <button className="dropbtn" >{version}</button>
        <div className="dropdown-content">
          {versions.reverse().map(v => (
            <a
              href={`${url.protocol}//${url.hostname}:${url.port}/${v}/${url.search}${url.hash}`}
              target="_parent"
              key={`blabbrVersionLink${counter++}`}
            >
              {v}
            </a>))}
        </div>
      </div>
    </div>
  );
};

Versions.propTypes = {
  versions: PropTypes.array,
};

Versions.defaultProps = {
  versions: [],
};

export default Versions;
