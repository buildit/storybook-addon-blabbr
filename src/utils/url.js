export const cleanToken = token =>
  token
    // remove special chars
    .replace(/[^\w\s]/gi, '')
    // collapse multiple spaces
    .replace(/\s{2,}/g, ' ')
    // convert space _
    .replace(/ /g, '_')
    .toLowerCase();

export const versionLink = (version) => {
  if (!window || !window.parent) {
    return '';
  }

  const url = window.parent.location;
  return `${url.protocol}//${url.hostname}:${url.port}/${version}/${url.search}${url.hash}`;
};
