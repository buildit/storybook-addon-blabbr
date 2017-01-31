import { makeRequest, cleanToken } from '../../utils';
import db from './db';

export const getComments = (component, story, version = '0_0_1') => {
  // returns a promise
  return db.find({
    "selector": {
      "$and": [
          { "componentId": cleanToken(component) },
          { "stateId": cleanToken(story) },
          { "version": cleanToken(version) }
        ]
    },
    "sort": [
      {
        "_id": "desc"
      }
    ]
  }).then((data) => {
    return {
      success: true,
      ...data
    };
  }).catch((error) => {
    return {
      success: false,
      msg: 'No comments available.'
    };
  });
};

export const postComment = ({
  timestampId,
  userName,
  userEmail,
  userComment,
  component,
  story,
  version = '0_0_1',
  eventName
}) => {
  let record = {
    _id: timestampId,
    userName: userName,
    userEmail: userEmail,
    componentId: cleanToken(component),
    comment: userComment,
    timestamp: timestampId,
    stateId: cleanToken(story),
    version: version,
    edited: false,
    lastUpdated: timestampId,
    eventName: eventName
  };

  //return
  return db.put(record).then((data) => {
    let returnObj = {};
    if (data.ok) {
      return {
        success: data.ok,
        msg: 'Your comment was added successfully.',
        ...record
      };
    } else {
      return {
        success: data.ok,
        msg: 'There was a problem posting your comment.',
      };
    }
  }).catch((error) => {
    return {
      success: false,
      msg: `There was a problem posting your comment. Error: ${error.message}`
    };
  });
};

export const updateComment = (commentId, userComment) => {
  let timestampId = new Date().getTime() + '';

  return db.find({
    "selector": {
      "_id": commentId
    }
  }).then((data) => {
    let record = data.docs[0];

    if (userComment === '' || userComment === null) {
      return {
        "success": false,
        "msg": "Cannot update with empty comment"
      };
    }
    record.comment = userComment;
    record.edited = true;
    record.lastUpdated = timestampId;

    return db.put(record).then((data) => {
      return {
        "success": true,
        "msg": "Your comment was edited successfully."
      };
    }).catch((error) => {
      return {
        "success": false,
        "msg": "There was an error editing your comment."
      };
    });
  });
};

export const deleteComment = (commentId) => {
  return db.find({
    "selector": {
      "_id": commentId
    }
  }).then((data) => {
    if (data.docs && data.docs.length) {
      let record = data.docs[0];
      record._deleted = true;
      return db.put(record).then((data) => {
        if (data.ok) {
          return {
            "success": true,
            "msg": "Your comment was removed successfully."
          };
        } else {
          return {
              "success": 0,
              "msg":  "There was a problem deleting your comment."
          };
        }
      }).catch((error) => {
        return {
            "success": 0,
            "msg":  `There was a problem deleting your comment. Error: ${error.message}`
        };
      });
    } else {
      return {
          "success": 0,
          "msg":  "There was a problem deleting your comment. Not found."
      };
    }
  }).catch((error) => {
    return {
        "success": 0,
        "msg":  `There was a problem deleting your comment. Not found. Error: ${error.message}`
    };
  });
};
