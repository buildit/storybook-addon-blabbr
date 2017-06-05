import { slack } from '../../utils/config'; // eslint-disable-line

export const postComment = (
  username,
  comment,
  componentName,
  componentUrl
) => {
  const requestHeaders = new Headers();
  const payload = {
    username,
    text: ``
  };

  const requestConfig = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(payload)
  };

  return fetch(slack.endPoint, requestConfig);
    // .then(...)
}