import { makeRequest } from './http';

export const cleanToken = token =>
  token
    // remove special chars
    .replace(/[^\w\s]/gi, '')
    // collapse multiple spaces
    .replace(/\s{2,}/g, ' ')
    // convert space _
    .replace(/ /g, '_')
    .toLowerCase();

export const getStorybookVersions = () => {
  if (!window || !window.parent) {
    return '';
  }

  const url = window.parent.location;
  const fileName = 'versions.json';
  const fileLocation = `${url.protocol}//${url.hostname}:${url.port}/${fileName}`;

  return makeRequest(fileLocation);
};
