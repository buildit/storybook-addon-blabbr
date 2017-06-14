export const cleanToken = token =>
  token
    // remove special chars
    .replace(/[^\w\s]/gi, '')
    // collapse multiple spaces
    .replace(/\s{2,}/g, ' ')
    // convert space _
    .replace(/ /g, '_')
    .toLowerCase();
