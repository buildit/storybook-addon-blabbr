import React, { PropTypes } from 'react';
import { FormGroup, FormControl, Button, Panel } from 'react-bootstrap';

const SubmitComment = ({
  onUserCommentChange,
  onCommentSubmit,
  userComment,
  title='Submit a comment',
  type='Add',
  onCommentCancel,
  comment = {}
}) => {
  const { _id = null, userEmail = '', userName = '' } = comment;

  const formTitle =
    type === 'Edit' ?
        <h2>{title}: <span>{`${userName} - ${userEmail}`}</span></h2>
      :
        <h2>{title}</h2>
    ;

  return (
    <Panel header={formTitle}>
      <form>
        <FormGroup>
          <FormControl
            componentClass="textarea"
            value={userComment}
            onChange={onUserCommentChange}
          />
        </FormGroup>

        { type === 'Edit' ?
          [
            <Button key={'save'}
              type="submit"
              id={_id}
              bsClass="btn btn-primary"
              style={{ marginRight: 10 }}
              onClick={onCommentSubmit}
            >
              Update
            </Button>,
            <Button key={'cancel'}
              id={_id}
              bsStyle="danger"
              onClick={onCommentCancel}
            >
              Cancel
            </Button>
          ]
          :
          <Button
            type="submit"
            bsClass="btn btn-primary"
            onClick={onCommentSubmit}
          >
            Submit
          </Button>
        }
      </form>
    </Panel>
  );
};

SubmitComment.propTypes = {
  onUserCommentChange: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
  userComment: PropTypes.string,
  type: PropTypes.string,
  comment: PropTypes.object,
  onCommentCancel: PropTypes.func,
  title: PropTypes.string
};

export default SubmitComment;
