import { makeRequest, cleanComponentId } from '../../utils';

const config = {
  endpoint: 'http://localhost:3001',
};

export const getComments = (component, story, version) => {
  const componentId = cleanComponentId(component);
  const endPoint = `${config.endpoint}${componentId ? '/' + componentId : ''}${story ? '/' + story : ''}${version ? '/' + version : ''}`;
  return makeRequest(endPoint);

};

export const  postComment = (component, story, version, comment) => {
	console.log(component, version, comment);
};
