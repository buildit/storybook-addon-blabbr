import React from 'react';
import addons from '@kadira/storybook-addons';
import Panel from './components/Panel';

addons.register('buildit/storybook-addon-reviewer', (api) => {
  const channel = addons.getChannel();

  addons.addPanel('buildit/storybook-addon-reviewer', {
    title: 'Reviewer',
    render: () => <Panel channel={channel} api={api} key="knobs-panel" />,
  });
});
