import React from 'react';

let key = 0;
const urlRegex = /\b((?:https?):\/\/\S*)/gi; // eslint-disable-line
function formatLine(line) {
  if (line) {
    const segments = line.split(urlRegex); // eslint-disable-line

    segments.forEach((element, index, array) => {
      if (index % 2) {
        array[index] = (  // eslint-disable-line
          <span><a
            key={`sb_blabbr_key${key++}`}
            target="_blank"
            rel="noopener noreferrer"
            href={element}
          >
            {element}
          </a> </span>
        );
      }
    });

    return <p key={`sb_blabbr_key${key++}`}>{segments}</p>;
  }
  return '';
}

export const formatToHTML = (text) => {
  if (text && typeof text === 'string' && text.length > 0) {
    const lines = text ? text.split('\n') : [];
    return lines.map(line => formatLine(line));
  }

  return '';
};
