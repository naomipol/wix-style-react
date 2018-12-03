import React from 'react';

import Markdown from 'wix-storybook-utils/Markdown';

import Popover from 'wix-style-react/Popover';
import Text from 'wix-style-react/Text';
import Button from 'wix-style-react/Button';

import { Layout, Cell } from 'wix-style-react/Layout';

class ClickablePopover extends React.Component {
  state = {
    shown: false,
  };

  toggle = () => this.setState(({ shown }) => ({ shown: !shown }));
  close = () => this.setState({ shown: false });

  render() {
    const { shown } = this.state;

    return (
      <div style={{ padding: 25 }}>
        <Popover
          showArrow
          placement="right"
          shown={shown}
          onClickOutside={this.close}
          {...this.props}
        >
          <Popover.Element>
            <Button onClick={this.toggle}>Click me to toggle</Button>
          </Popover.Element>
          <Popover.Content>
            <div style={{ padding: '12px 24px', textAlign: 'center' }}>
              <Button height="x-small">Nothing</Button>
            </div>
          </Popover.Content>
        </Popover>
      </div>
    );
  }
}

class HoverablePopover extends React.Component {
  state = {
    shown: false,
  };

  open = () => this.setState({ shown: true });
  close = () => this.setState({ shown: false });

  render() {
    const { shown } = this.state;

    return (
      <div style={{ padding: 25 }}>
        <Popover
          showArrow
          placement="right"
          shown={shown}
          onMouseEnter={this.open}
          onMouseLeave={this.close}
          {...this.props}
        >
          <Popover.Element>
            <Button>Hover me to open</Button>
          </Popover.Element>
          <Popover.Content>
            <div style={{ padding: '12px 24px', textAlign: 'center' }}>
              Now hover me!
            </div>
          </Popover.Content>
        </Popover>
      </div>
    );
  }
}

export default () => (
  <div style={{ maxWidth: 1254 }}>
    <Markdown
      source={`
A Popover can be interactive when setting \`appendTo="parent"\`. This means the
event handlers set directly on the \`<Popover/>\` component will be triggerd on
both the \`<Popover.Element/>\` and \`<Popover.Content/>\`

#### Using click handlers

The following example uses the \`onClick\` and the \`onClickOutside\` handlers
to toggle the Popover. Notice that in the non-interative example, when clicking
the \`<Popover.Content/>\`, the \`onClickOutside\` event fires.
      `}
    />

    <Layout>
      <Cell span={6}>
        <Text>Interactive</Text>
        <ClickablePopover appendTo="parent" />
      </Cell>

      <Cell span={6}>
        <Text>Non-Interactive</Text>
        <ClickablePopover appendTo="window" />
      </Cell>
    </Layout>
    <Markdown
      source={`
#### Using mouse events

A similar approach can be used with mouse events handlers (\`onMouseEnter\`,
\`onMouseLeave\`). Notice that in the non-interative example, the
\`onMouseLeave\` event fires when entering the \`<Popover.Content/>\`.
      `}
    />

    <Layout>
      <Cell span={6}>
        <Text>Interactive</Text>
        <HoverablePopover appendTo="parent" />
      </Cell>

      <Cell span={6}>
        <Text>Non-Interactive</Text>
        <HoverablePopover appendTo="window" />
      </Cell>
    </Layout>
  </div>
);
