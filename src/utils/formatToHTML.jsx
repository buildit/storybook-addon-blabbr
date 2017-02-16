import React from 'react';

function formatItalic(line) {
  // if (line) {
  //
  // }
  return line;
}

function formatBold(line) {
  // if (line) {
  //
  // }
  return formatItalic(line);
}

let key = 0;
const urlRegex = /\b((?:https?):\/\/\S*?)[\s$\)]/gi;
function formatLine(line) {
  if (line) {
    const segments = line.split(urlRegex); // eslint-disable-line

    segments.forEach( (element, index, array) => {
      if (index % 2) {
        array[index] = <a key={`sb_blabbr_key${key++}`} target="_blank" ref="noopener noreferrer" href={element}>{element}</a>
      }
    });
    console.log(segments);

    return (
      <p key={`sb_blabbr_key${key++}`}>
        {segments}
      </p>
    );
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
