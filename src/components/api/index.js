import { makeRequest, cleanToken } from '../../utils';

const config = {
  endpoint: 'http://localhost:3000',
};

export const getComments = (component, story, version) => {
  const componentId = cleanToken(component);
  const storyId = cleanToken(story);
  const endPoint = `${config.endpoint}${componentId ? '/' + componentId : ''}${storyId ? '/' + storyId : ''}${version ? '/' + version : ''}`;
  console.log("componentId", componentId);
  console.log("storyId", storyId);
  console.log("endpoint", endPoint);
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
      'stateId': cleanToken(story),
      'version': version || "initial",
    })
  });
};

export const deleteComment = (component, commentId) => {
	const url = `${config.endpoint}/${cleanToken(component)}/${commentId}`;
	return makeRequest(url, {
		method: 'DELETE'
	});
};
