import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';
import { storySettings, placements } from './storySettings';

import Popover from '../../src/Popover';

import ExampleDropdownLayout from './examples/ExampleDropdownLayout';
import ExampleDropdownLayoutRaw from '!raw-loader!./examples/ExampleDropdownLayout';

import ExampleAppendTo from './examples/ExampleAppendTo';
import ExampleAppendToRaw from '!raw-loader!./examples/ExampleAppendTo';

import ExamplePositioning from './examples/ExamplePositioning';
import ExamplePositioningRaw from '!raw-loader!./examples/ExamplePositioning';

import ExampleInteractive from './examples/ExampleInteractive';
import ExampleInteractiveRaw from '!raw-loader!./examples/ExampleInteractive';

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

    children: children[0].value,
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
      <CodeExample title="With DropdownLayout" code={ExampleDropdownLayoutRaw}>
        <ExampleDropdownLayout />
      </CodeExample>

      <CodeExample title="AppendTo prop" code={ExampleAppendToRaw}>
        <ExampleAppendTo />
      </CodeExample>

      <CodeExample title="Positioning" code={ExamplePositioningRaw}>
        <ExamplePositioning />
      </CodeExample>

      <CodeExample title="Interactive" code={ExampleInteractiveRaw}>
        <ExampleInteractive />
      </CodeExample>
    </div>
  ),
};
