import React, { PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';
import './styles.css';

const SubmitComment = ({
  onUserCommentChange,
  onCommentSubmit,
  userComment,
  title = 'Submit a comment',
  type = 'Add',
  onCommentCancel,
  comment = {},
}) => {
  const { _id = null, userEmail = '', userName = '' } = comment;

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
        <FormControl
          componentClass="textarea"
          value={userComment}
          onChange={onUserCommentChange}
          style={{
            width: '100%',
          }}
        />

        { type === 'Edit' ?
        [
          <button
            key={'save'}
            type="submit"
            id={_id}
            bsClass="btn btn-primary"
            style={{ marginRight: 10 }}
            onClick={onCommentSubmit}
            title="Update"
          >
            Update
          </button>,
          <button
            key={'cancel'}
            id={_id}
            bsStyle="danger"
            onClick={onCommentCancel}
            title="Cancel"
          >
            Remove
          </button>,
        ]
          :
        <button
          type="submit"
          onClick={onCommentSubmit}
          title="Submit"
        >
          Submit
        </button>
        }
      </form>
    </section>
  );
};

SubmitComment.propTypes = {
  onUserCommentChange: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
  userComment: PropTypes.string,
  type: PropTypes.string,
  comment: PropTypes.object,
  onCommentCancel: PropTypes.func,
  title: PropTypes.string,
};

export default SubmitComment;
