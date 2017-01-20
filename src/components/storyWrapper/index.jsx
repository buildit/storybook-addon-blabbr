import React from 'react';
import { Panel } from '../';

class StoryWrapper extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        <Panel inStory />
      </div>
    );
  }
}

export default StoryWrapper;
