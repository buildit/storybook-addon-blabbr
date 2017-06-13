export const verifyStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

export const parseJSON = response => {
  if (response.status !== 204) {
    return response.json();
  }
  return '{}';
};

export const makeRequest = (url, options = {}) =>
  fetch(url, options).then(verifyStatus).then(parseJSON);
