import { makeRequest } from '../../utils';
import stubComments from '../../../stub/comments.Button';

const config = {
	endpoint: 'http://localhost:3000',
};

export const getComments = (component, story, version) => {
	// const endPoint = `${config.endpoint}/${component}/${story}/${version || ''}`;
	// console.log(config.endpoint);
	// return makeRequest(config.endpoint);
	return Promise.resolve(stubComments());
};

export const  postComment = (component, story, version, comment) => {
	console.log(component, version, comment);
};
