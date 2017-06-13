import db from './db';
import { postComment as postSlackComment, editComment as editSlackComment } from './slack';

// Return all the comments for the particular component and story
// NOTE: Version is ignored for now, all comments are returned
export const getComments = (component, story/* , version = 'version_not_set' */) =>
  // returns a promise
   db.find({
     selector: {
       $and: [
          { componentId: component },
          { stateId: story },
          // { version },
       ],
     },
     sort: [
       {
         _id: 'desc',
       },
     ],
   }).then(data => ({
     success: true,
     ...data,
   })).catch(() => ({
     success: false,
     msg: 'No comments available.',
   }));

export const postComment = ({
  timestampId,
  userName,
  userEmail,
  userComment,
  component,
  story,
  version,
  eventName,
}) => {
  const record = {
    _id: timestampId,
    userName,
    userEmail,
    componentId: component,
    comment: userComment,
    timestamp: timestampId,
    stateId: story,
    version,
    edited: false,
    lastUpdated: timestampId,
    eventName,
  };

  postSlackComment({
    userName,
    userEmail,
    comment: userComment,
    componentName: component,
    componentUrl: window.location.href,
  });

  return db.put(record).then((data) => {
    if (data.ok) {
      return {
        success: data.ok,
        msg: 'Your comment was added successfully.',
        ...record,
      };
    }
    return {
      success: data.ok,
      msg: 'There was a problem posting your comment.',
    };
  }).catch(error => ({
    success: false,
    msg: `There was a problem posting your comment. Error: ${error.message}`,
  }));
};

export const updateComment = ({
  commentId,
  component,
  userCommentText,
  userEmail,
  userName,
}) => {
  const timestampId = `${new Date().getTime()}`;
  const userComment = userCommentText && userCommentText.trim();

  editSlackComment({
    userName,
    userEmail,
    comment: userComment,
    componentName: component,
    componentUrl: window.location.href,
  });

  return db.find({
    selector: {
      _id: commentId,
    },
  }).then((data) => {
    const record = data.docs[0];

    if (userComment === '' || userComment === null) {
      return {
        success: false,
        msg: 'Cannot update with empty comment',
      };
    }
    record.comment = userComment;
    record.edited = true;
    record.lastUpdated = timestampId;

    return db.put(record).then(() => ({
      success: true,
      msg: 'Your comment was edited successfully.',
    })).catch(() => ({
      success: false,
      msg: 'There was an error editing your comment.',
    }));
  });
};

export const deleteComment = commentId => db.find({
  selector: {
    _id: commentId,
  },
}).then((data) => {
  if (data.docs && data.docs.length) {
    const record = data.docs[0];
    record._deleted = true;
    return db.put(record).then((result) => {
      if (result.ok) {
        return {
          success: true,
          msg: 'Your comment was removed successfully.',
        };
      }
      return {
        success: 0,
        msg: 'There was a problem deleting your comment.',
      };
    }).catch(error => ({
      success: 0,
      msg: `There was a problem deleting your comment. Error: ${error.message}`,
    }));
  }
  return {
    success: 0,
    msg: 'There was a problem deleting your comment. Not found.',
  };
}).catch(error => ({
  success: 0,
  msg: `There was a problem deleting your comment. Not found. Error: ${error.message}`,
}));
