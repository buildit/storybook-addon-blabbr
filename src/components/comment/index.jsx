import React, { PropTypes } from 'react';
import { Panel, Well, Button } from 'react-bootstrap';
const Comment = ({
  username,
  emailId,
  date,
  comment,
  approved
}) => {
  const panelHeader = (
    <h3>{date}</h3>
  );
  return (
    <Panel header={panelHeader}>
      <h4 className="h5">{`${username} - ${emailId}`}</h4>
      <Well>
        {comment}
      </Well>
      <Button
        bsStyle="success"
        style={{ marginRight: 10 }}
        disabled={approved}>
          {approved ? 'Approved' : 'Approve'}
      </Button>
      <Button
        bsStyle="warning">
        Edit
      </Button>
    </Panel>
  );
};

Comment.propTypes = {
  emailId: PropTypes.string.isRequired,
  username: PropTypes.string,
  date: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  approved: PropTypes.bool,
};

Comment.defaultProps = {
  approved: false,
};

export default Comment;
