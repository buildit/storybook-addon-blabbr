import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Panel } from '../';

class StoryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.toggleComments = this.toggleComments.bind(this);

    this.state = {
      showComments: false,
    };
  }

  toggleComments() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }

  render() {
    return (
      <div>
        {this.props.children}
        <button
          type="button"
          className="btn btn-default"
          onClick={this.toggleComments}
          style={{
            display: 'block',
            marginTop: '10px',
          }}
        >
          <span className="glyphicon glyphicon-comment" />
        </button>
        { this.state.showComments && <Panel inStory /> }
      </div>
    );
  }
}

export default StoryWrapper;
