import React from 'react';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
    console.log('Init');
  }

  render() {
    return (
      <div>
        The Reviewer
      </div>
    );
  }
}
