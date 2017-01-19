import { makeRequest, cleanComponentId } from '../../utils';

const config = {
  endpoint: 'http://localhost:3001',
};

export const getComments = (component, story, version) => {
  const componentId = cleanComponentId(component);
  const endPoint = `${config.endpoint}${componentId ? '/' + componentId : ''}${story ? '/' + story : ''}${version ? '/' + version : ''}`;
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
  const url = `${config.endpoint}/${cleanComponentId(component)}`;
  return makeRequest(url, {
    method: 'POST',
    body: JSON.stringify({
      userName: userName,
      userEmail: userEmail,
      'comment': userComment,
      'stateId': story,
      'version': version || "null",
    })
  });
};
