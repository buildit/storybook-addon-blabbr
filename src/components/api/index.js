const config = {
  endpoint: 'http://localhost:3000',
};

function getComments(component, version) {
  const endPoint = `${config.endpoint}/${component}${version || ''}`;
  console.log(endPoint);

  return fetch(endPoint);
}

function postComment(component, version, comment) {
  console.log(component, version, comment);
}

export { getComments, postComment };
