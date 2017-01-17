import React from 'react';
import { getComments } from '../api';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.onStoryChangeHandler = this.onStoryChangeHandler.bind(this);

    if (this.props.api) {
      this.props.api.onStory(this.onStoryChangeHandler);
    }

    this.state = {
      comments: null,
    };
  }

  // Handle change of story
  onStoryChangeHandler(kind, story) {
    // Request comments for this component
    getComments('component123', 'version0.0.1')
      .then((response) => {
        console.log('ze response', response);
      })
      .catch((error) => {
        console.log('ze error', error);
      });

    // Render components
    this.setState({
      comments: null,
    });
  }

  render() {
    return (
      <div>
        The Reviewer
      </div>
    );
  }
}

Panel.propTypes = {
  api: React.PropTypes.object,
  inline: React.PropTypes.bool,
};

Panel.defaultProps = {
  api: null,
  inline: true,
};
