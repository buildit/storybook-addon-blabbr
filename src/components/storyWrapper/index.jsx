import React from 'react';

class StoryWrapper extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
        Comments are here
      </div>
    );
  }
}

export default StoryWrapper;
