import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class StoryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentCount: 0
    };
  }

  render() {
    return (
      <div id="blabbr-storyWrapper">
        <div id="blabbr-storyWrapper-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

StoryWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default StoryWrapper;
