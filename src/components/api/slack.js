import { slack } from '../../utils/config';

export const postComment = (
  username,
  comment,
  componentName,
  componentUrl,
) => {
  const requestHeaders = new Headers();
  const payload = {
    username,
    text: `${username} just commented on component <${componentUrl}|${componentName}>: ` +
      `${comment}`,
  };

  const requestConfig = {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(payload),
  };

  return fetch(slack.endPoint, requestConfig);
}
