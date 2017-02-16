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
function formatLine(line) {
  if (line) {
    const hyperlink = /\b((?:https?):\/\/(.*?))[\s$\)]/mg.exec(line); // eslint-disable-line
    if (hyperlink) {
      return (
        <p key={`sb_blabbr_key${key++}`}>
          {formatBold(line.slice(0, hyperlink.index))}
          <a target="_blank" rel="noopener noreferrer" href={hyperlink[1]}>{hyperlink[1]}</a>
          {formatBold(line.slice(hyperlink.index + hyperlink[1].length))}
        </p>
      );
    }
    return <p key={`sb_blabbr_key${key++}`}>{formatBold(line)}</p>;
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
