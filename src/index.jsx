import React from 'react';

function addComments(storyName, storyFn, _options) {
  return this.add(storyName, (context) => (
    <div>
      This story has comments<br />
      {storyFn(context)}
    </div>
  ));
}

export default addComments;
