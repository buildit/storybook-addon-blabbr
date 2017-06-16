import React from 'react';
import addons from '@storybook/addons';
import Panel from './components/panel';

addons.register('buildit/blabbr', api => {
  const channel = addons.getChannel();

  addons.addPanel('buildit/blabbr', {
    title: 'blabbr',
    render: () => <Panel channel={channel} storybook={api} key="blabbr-panel" />
  });
});
