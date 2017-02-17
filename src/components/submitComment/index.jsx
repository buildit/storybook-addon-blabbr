import React, { PropTypes } from 'react';
import PrimaryButton from '../button/primaryButton';
import RegularTextArea from '../form-fields/textArea';
import { H2 } from '../typography/index';


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
      <H2>{title}: <span>{`${userName} - ${userEmail}`}</span></H2>
      :
      <H2>{title}</H2>
    ;

  return (
    <section>
      <form style={{ marginBottom: 25 }}>
        {formTitle}
        <RegularTextArea value={userComment} onChange={onUserCommentChange} placeholder="Enter a comment..." />
        { type === 'Edit' ?
        [
          <PrimaryButton key={'save'} type="submit" id={_id} onClick={onCommentSubmit} title="Update" >Update</PrimaryButton>,
          <PrimaryButton key={'cancel'} id={_id} type="submit" onClick={onCommentCancel} title="Cancel">Cancel</PrimaryButton>,
        ]
          :
        <PrimaryButton type="submit" onClick={onCommentSubmit} title="Submit" >Submit</PrimaryButton>
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
