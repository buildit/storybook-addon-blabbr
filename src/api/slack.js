import { slack } from '../utils/config';

const getTimestamp = () => Math.floor(Date.now() / 1000);

const makeRequest = payload => {
  const requestHeaders = new Headers();

  const requestConfig = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(payload)
  };

  return slack().then(response => {
    return fetch(response.endPoint, requestConfig).then(response => {
      return { success: response.ok };
    });
  });
};

export const postComment = ({
  userName,
  userEmail,
  comment,
  componentName,
  componentUrl
}) => {
  const payload = {
    username: 'Blabbr',
    attachments: [
      {
        fallback: `${userName} added a new comment to ${componentName}.`,
        color: '#36a64f',
        author_name: `${userName} (${userEmail})`,
        title: `Added a new comment to ${componentName}`,
        title_link: componentUrl,
        text: comment,
        ts: getTimestamp()
      }
    ]
  };
  return makeRequest(payload);
};

export const editComment = ({
  userName,
  userEmail,
  comment,
  componentName,
  componentUrl
}) => {
  const payload = {
    username: 'Blabbr',
    attachments: [
      {
        fallback: `${userName} edited their comment on ${componentName}.`,
        color: '#ffcc33',
        author_name: `${userName} (${userEmail})`,
        title: `Edited their comment on ${componentName}`,
        title_link: componentUrl,
        text: comment,
        ts: getTimestamp()
      }
    ]
  };

  return makeRequest(payload);
};
