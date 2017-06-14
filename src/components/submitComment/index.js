import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const FormTitle = props => {
  const { type, title, userName, userEmail } = props;

  return type === 'Edit'
    ? <h2>{title}: <span>{`${userName} - ${userEmail}`}</span></h2>
    : <h2>{title}</h2>;
};

FormTitle.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  userName: PropTypes.string,
  userEmail: PropTypes.string
};

FormTitle.defaultProps = {
  type: '',
  title: '',
  userName: '',
  userEmail: ''
};

const UpdateOrCancelButtons = props => {
  const { _id, handleSubmit, handleCancel } = props;

  return (
    <div>
      <button
        key={'save'}
        type="submit"
        id={_id}
        style={{ marginRight: 10 }}
        onClick={handleSubmit}
        title="Update"
      >
        Update
      </button>
      <button key={'cancel'} id={_id} onClick={handleCancel} title="Cancel">
        Cancel
      </button>
    </div>
  );
};

UpdateOrCancelButtons.propTypes = {
  _id: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleCancel: PropTypes.func
};

const SubmitButton = props =>
  <button type="submit" onClick={props.handleSubmit} title="Submit">
    Submit
  </button>;

SubmitButton.propTypes = {
  handleSubmit: PropTypes.func
};

class SubmitCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasErrors: false,
      userComment: ''
    };
  }

  handleChange = event => {
    this.setState({
      hasErrors: false,
      userComment: event.target.value
    });
    this.props.handleChange(event.target.value);
  };

  handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();

    if (!this.state.userComment || this.state.userComment.length < 1) {
      this.setState({ hasErrors: true });
    } else {
      this.props.handleSubmit(event.target.id);
    }
  };

  render() {
    const {
      userComment,
      title = 'Add a comment:',
      type = 'Add',
      onCommentCancel,
      comment = {}
    } = this.props;

    const { _id = null, userEmail = '', userName = '' } = comment;

    return (
      <section className="blabbr-submitComment">
        <form>
          <FormTitle
            type={type}
            title={title}
            userName={userName}
            userEmail={userEmail}
          />
          <textarea value={userComment} onChange={this.handleChange} />
          {this.state.hasErrors &&
            <div className="error">You need to enter a comment.</div>}
          {type === 'Edit'
            ? <UpdateOrCancelButtons
                _id={_id}
                handleSubmit={this.handleSubmit}
                handleCancel={onCommentCancel}
              />
            : <SubmitButton _id={_id} handleSubmit={this.handleSubmit} />}
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
