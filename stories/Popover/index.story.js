import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';
import { storySettings, placements } from './storySettings';

import Popover from '../../src/Popover';

import ExampleAppendTo from './examples/ExampleAppendTo';
import ExampleInteractive from './examples/ExampleInteractive';

import ExamplePositioning from './examples/ExamplePositioning';
import ExamplePositioningRaw from '!raw-loader!./examples/ExamplePositioning';

const Example = ({ title, children }) => (
  <div>
    <Markdown source={`### ${title}`} />
    {children}
  </div>
);

const children = [
  {
    label: 'Content without padding',
    value: [
      <Popover.Element key="1">This is the Popover.Element</Popover.Element>,
      <Popover.Content key="2">Content without padding</Popover.Content>,
    ],
  },
  {
    label: 'Content with padding',
    value: [
      <Popover.Element key="1">This is the Popover.Element</Popover.Element>,
      <Popover.Content key="2">
        <div style={{ padding: '12px 24px', textAlign: 'center' }}>
          Content with padding
        </div>
      </Popover.Content>,
    ],
  },
];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: Popover,
  componentPath: '../../src/Popover/Popover.js',

  componentProps: (setProps, getProps) => ({
    dataHook: storySettings.dataHook,

    children: children[1].value,
    showArrow: true,
    timeout: 150,
    shown: false,
    placement: 'top',
    appendTo: 'parent',

    onClick: () => setProps({ shown: !getProps().shown }),
  }),

  exampleProps: {
    children,

    appendTo: [
      { label: 'window', value: window },
      { label: 'scrollParent', value: 'scrollParent' },
      { label: 'viewport', value: 'viewport' },
      { label: 'parent', value: 'parent' },
      { label: 'null', value: null },
    ],

    placement: placements,
  },

  examples: (
    <div>
      <Example title="`appendTo` prop">
        <ExampleAppendTo />
      </Example>

      <CodeExample title="Positioning" code={ExamplePositioningRaw}>
        <ExamplePositioning />
      </CodeExample>

      <Example title="Interactive">
        <ExampleInteractive />
      </Example>
    </div>
  ),
};
