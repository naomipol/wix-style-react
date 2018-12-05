import React from 'react';
import { mount } from 'enzyme';
import path from 'path';

import {
  isTestkitExists,
  isEnzymeTestkitExists,
  isUniEnzymeTestkitExists,
  isUniTestkitExists,
} from '../test/utils/testkit-sanity';
import importAllComponents from '../test/utils/import-all-components';

import * as reactTestUtilsTestkitFactories from './index';
import * as enzymeTestkitFactories from './enzyme';

import Popover from '../src/Popover';

/**
 * The following list ignores specified components and skip testkit tests for them.
 * Reason is that some of them are not meant to have testkits, some are failing due to missing configuration (e.g.
 * required initial props) or other reasons.
 *
 * Goal should be to reduce this list to minimum, or, ideally, get rid of it entirely.
 */
const FAILING_COMPONENTS = [
  'AutoCompleteComposite',
  'BadgeSelectItemBuilder',
  'ButtonLayout',
  'ButtonWithOptions',
  'CalendarPanel',
  'Card',
  'CloseButton',
  'ColorPicker',
  'Composite',
  'DatePicker',
  'DragAndDrop',
  'DragDropContextProvider',
  'DropdownComposite',
  'EndorseContentLayout',
  'FloatingHelper',
  'FullTextView',
  'GoogleAddressInput',
  'GoogleAddressInputWithLabel',
  'Grid', // Component has no testkit
  'HBox', // Component has no testkit
  'IconWithOptions',
  'Layout',
  'MessageBox',
  // 'Modal',
  'ModalSelectorLayout',
  'MultiSelect',
  'MultiSelectCheckbox',
  'MultiSelectComposite',
  'Notification',
  'Page',
  'PageHeader',
  'PopoverMenuItem',
  'Range',
  'RichTextArea',
  'RichTextAreaComposite',
  'SideMenuDrill',
  'TableToolbar',
  'Tabs',
  'TextArea',
  'TextField',
  'Tooltip',
  'VBox', // Component has no testkit
  'Collapse',
];

/**
 * The following object allows to set which testkits should be asserted as well as provide any required props
 *
 * If component is not set here, then enzyme and vanilla testkits will be checked as default.
 *
 * COMPONENTS = {
 *   [componentName]: {
 *     drivers: ['vanilla', 'enzyme'],
 *     props: {
 *       // any required props
 *     }
 *   }
 * }
 */
const COMPONENTS = {
  TextButton: {
    unidriver: true,
  },
  IconButton: {
    unidriver: true,
  },
  CloseButton: {
    unidriver: true,
  },
  Tag: {
    props: {
      useOldMargins: false,
      id: 'hello',
      children: 'a',
    },
  },
  ImageViewer: {
    props: {
      imageUrl: '',
    },
  },
  FormField: {
    props: {
      children: <div />,
    },
  },
  BadgeSelect: {
    props: {
      options: [{ id: '0', skin: 'general', text: 'general' }],
      selectedId: '0',
    },
  },
  Breadcrumbs: {
    props: {
      items: [{ id: 0, value: 'Option 1' }, { id: 1, value: 'Option 2' }],
    },
  },
  Calendar: {
    props: {
      onChange: () => {},
    },
  },
  DataTable: {
    props: {
      data: [{ a: 'value 1', b: 'value 2' }],
      columns: [{ title: 'A', render: row => row.a }],
    },
  },
  Slider: {
    props: {
      onChange: () => {},
    },
  },
  Selector: {
    props: {
      id: 1,
      title: 'title',
    },
  },
  StatsWidget: {
    props: {
      title: 'test title',
    },
  },
  Table: {
    props: {
      data: [{ a: 'value 1', b: 'value 2' }],
      columns: [{ title: 'A', render: row => row.a }],
    },
  },
  Modal: {
    props: {
      isOpen: false,
      contentLabel: 'modal_12345678',
    },
  },
  Popover: {
    props: {
      children: [
        <Popover.Element>
          <div>I am the trigger!</div>
        </Popover.Element>,
        <Popover.Content>
          <div>I am the content!</div>
        </Popover.Content>,
      ],
    },
  },
};

const cwd = path.resolve(__dirname, '..', 'src');
const lowerFirst = a =>
  a
    .charAt(0)
    .toLowerCase()
    .concat(a.slice(1));

const AllComponents = importAllComponents({
  cwd,
  ignore: FAILING_COMPONENTS,
});

const DRIVER_ASSERTS = {
  enzyme: ({ name, component, props }) => {
    describe('Enzyme testkits', () => {
      it(`${name} should have enzyme testkit`, () => {
        expect(
          isEnzymeTestkitExists(
            React.createElement(component, props),
            enzymeTestkitFactories[`${lowerFirst(name)}TestkitFactory`],
            mount,
          ),
        );
      });
    });
  },

  vanilla: ({ name, component, props }) => {
    describe('ReactTestUtils testkits', () => {
      it(`${name} should have ReactTestUtils testkit`, () => {
        expect(
          isTestkitExists(
            React.createElement(component, props),
            reactTestUtilsTestkitFactories[`${lowerFirst(name)}TestkitFactory`],
          ),
        );
      });
    });
  },
  enzymeUni: ({ name, component, props }) => {
    describe('Enzyme unidriver testkits', () => {
      it(`${name} should have enzyme testkit`, () => {
        expect(
          isUniEnzymeTestkitExists(
            React.createElement(component, props),
            enzymeTestkitFactories[`${lowerFirst(name)}TestkitFactory`],
            mount,
          ),
        );
      });
    });
  },
  vanillaUni: ({ name, component, props }) => {
    describe('ReactTestUtils unidriver testkits', () => {
      it(`${name} should have ReactTestUtils testkit`, () => {
        expect(
          isUniTestkitExists(
            React.createElement(component, props),
            reactTestUtilsTestkitFactories[`${lowerFirst(name)}TestkitFactory`],
          ),
        );
      });
    });
  },
};

Object.entries(AllComponents).forEach(([name, component]) => {
  const driverConfig = COMPONENTS[name];

  if (driverConfig) {
    const drivers = driverConfig.drivers || ['vanilla', 'enzyme'];
    const props = driverConfig.props || {};

    if (driverConfig.unidriver) {
      DRIVER_ASSERTS.enzymeUni({ name, component, props: {} });
      DRIVER_ASSERTS.vanillaUni({ name, component, props: {} });
    } else {
      drivers.map(driver => DRIVER_ASSERTS[driver]({ name, component, props }));
    }
  } else {
    DRIVER_ASSERTS.enzyme({ name, component, props: {} });
    DRIVER_ASSERTS.vanilla({ name, component, props: {} });
  }
});
