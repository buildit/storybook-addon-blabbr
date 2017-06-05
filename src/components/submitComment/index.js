import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class SubmitCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasErrors: false
    };
  }

  handleChange = (event) => {
    this.setState({ hasErrors: false });
    this.props.handleChange(event.target.value);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!this.refs.userComment.value ||
      this.refs.userComment.value.length < 1) {
      this.setState({
        hasErrors: true
      });
    } else {
      this.props.handleSubmit(event.target.id);
    }
  }

  render() {
    const {
      userComment,
      title = 'Add a comment:',
      type = 'Add',
      onCommentCancel,
      comment = {}
    } = this.props;

    const {
      _id = null,
      userEmail = '',
      userName = ''
    } = comment;

    const formTitle =
      type === 'Edit' ?
        <h2>{title}: <span>{`${userName} - ${userEmail}`}</span></h2>
        :
        <h2>{title}</h2>
      ;

    return (
      <section className="blabbr-submitComment">
        <form>
          {formTitle}
          <textarea
            value={userComment}
            onChange={this.handleChange}
            ref="userComment"
          />
          { this.state.hasErrors && 
            <div className="error">You need to enter a comment.</div>
          }
          { type === 'Edit' ?
          [
            <button
              key={'save'}
              type="submit"
              id={_id}
              style={{ marginRight: 10 }}
              onClick={this.handleSubmit}
              title="Update"
            >
              Update
            </button>,
            <button
              key={'cancel'}
              id={_id}
              onClick={onCommentCancel}
              title="Cancel"
            >
              Cancel
            </button>,
          ]
            :
          <button
            type="submit"
            onClick={this.handleSubmit}
            title="Submit"
          >
            Submit
          </button>
          }
        </form>
      </section>
    );
  }
}

SubmitCommentForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  userComment: PropTypes.string,
  type: PropTypes.string,
  comment: PropTypes.object,
  onCommentCancel: PropTypes.func,
  title: PropTypes.string
};

export default SubmitCommentForm;
