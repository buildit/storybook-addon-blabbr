import React, { PropTypes } from 'react';
import { FormGroup, FormControl, Button, Panel } from 'react-bootstrap';

const SubmitComment = ({
  onUserCommentChange,
  onCommentSubmit,
  userComment,
}) => {
  const formTitle = (
    <h2>Submit a comment</h2>
  );
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

        <Button
          type="submit"
          bsClass="btn btn-primary"
          onClick={onCommentSubmit}
        >
          Submit
        </Button>
      </form>
    </Panel>
  );
};

SubmitComment.propTypes = {
  onUserCommentChange: PropTypes.func.isRequired,
  onCommentSubmit: PropTypes.func.isRequired,
  userComment: PropTypes.string,
};

export default SubmitComment;
