import { makeRequest, cleanToken } from '../../utils';

const config = {
  endpoint: 'http://localhost:3001',
};

export const getComments = (component, story, version) => {
  const componentId = cleanToken(component);
  const storyId = cleanToken(story);
  const endPoint = `${config.endpoint}${componentId ? '/' + componentId : ''}${storyId ? '/' + storyId : ''}${version ? '/' + version : ''}`;
  return makeRequest(endPoint);

};

export const postComment = ({
  userName,
  userEmail,
  userComment,
  component,
  story,
  version,
}) => {
  const url = `${config.endpoint}/${cleanToken(component)}`;
  return makeRequest(url, {
    method: 'POST',
    body: JSON.stringify({
      userName: userName,
      userEmail: userEmail,
      'comment': userComment,
      'stateId': story,
      'version': version || "initial",
    })
  });
};
