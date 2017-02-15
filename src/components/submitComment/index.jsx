import React, { PropTypes } from 'react';
import PrimaryButton from '../button/primaryButton.jsx';
import RegularTextArea from '../form-fields/textArea.jsx';
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
      <form style={{marginBottom: 25}}>
        {formTitle}
        <RegularTextArea value={userComment} onChange={onUserCommentChange}/>
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
