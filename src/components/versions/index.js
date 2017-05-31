import React from 'react';
import PropTypes from 'prop-types';
import { version } from '../../utils/config';
import './styles.css';

class Versions extends React.Component {
  constructor() {
    super();
    this.state = {
      versions: null,
    };
  }

  componentWillMount() {
    if (version) {
      const url = window.parent.location;
      const location = `${url.protocol}//${url.hostname}:${url.port}/versions.json`;

      fetch(location).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            this.setState({
              versions: data.reverse(),
            });
          });
        }
      }).catch(() => {
        // Ignore. Maybe we want to remove the div?
      });
    }
  }

  render() {
    if (version && !this.state.versions) {
      return null;
    }

    const url = window.parent.location;

    return (
      <div id="blabbr-version-history">
        <div className="dropdown">
          <button className="dropbtn" >{version}</button>
          <div className="dropdown-content">
            {this.state.versions.map(v => (
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
  }
}

Versions.propTypes = {
  onUserCommentChange: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
  userComment: PropTypes.string,
  type: PropTypes.string,
  comment: PropTypes.object,
  onCommentCancel: PropTypes.func,
  title: PropTypes.string,
};

export default Versions;
