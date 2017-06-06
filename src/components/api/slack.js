import { slack } from '../../utils/config';

export const postComment = (
  { userName, userEmail },
  comment,
  { componentName, componentUrl }
) => {
  const payload = {
    username: 'Blabbr',
    attachments: [
        {
            fallback: `${userName} just left a comment on ${componentName}.`,
            color: '#36a64f',
            author_name: `${userName} (${userEmail})`,
            title: `New comment on ${componentName}`,
            title_link: componentUrl,
            text: comment,
			      ts: Date.now()
        }
    ]
  };

  return makeRequest(payload);
}

export const editComment = (
  { userName, userEmail },
  comment,
  { componentName, componentUrl }
) => {
  const payload = {
    username: 'Blabbr',
    attachments: [
        {
            fallback: `${userName} edited a comment on ${componentName}.`,
            color: '#ffff00',
            author_name: `${userName} (${userEmail})`,
            title: `Edited their comment on ${componentName}`,
            title_link: componentUrl,
            text: comment,
			      ts: Date.now()
        }
    ]
  };

  return makeRequest(payload);
}

const makeRequest = (payload) => {
  const requestHeaders = new Headers();

  const requestConfig = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(payload),
  };

  return fetch(slack.endPoint, requestConfig);
}