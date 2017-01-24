import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

class StoryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.showComments = this.showComments.bind(this);

    this.state = {
      commentCount: 0,
    };
  }

  showComments() {
    this.props.channel.emit('blabbrFocusTab');
  }

  render() {
    return (
      <div>
        {this.props.children}
        <button
          type="button"
          className="btn btn-default"
          onClick={this.showComments}
          style={{
            position: 'fixed',
            top: '0',
            right: '0',
            display: 'block',
          }}
        >
          <span className="glyphicon glyphicon-comment" />
        </button>
      </div>
    );
  }
}

StoryWrapper.propTypes = {
  channel: React.PropTypes.object.isRequired,
};

export default StoryWrapper;
