import React from 'react';

import Markdown from 'wix-storybook-utils/Markdown';

import Popover from 'wix-style-react/Popover';
import Text from 'wix-style-react/Text';
import Button from 'wix-style-react/Button';

class PopoverWithState extends React.Component {
  state = {
    shown: true,
  };

  toggle = () => this.setState(({ shown }) => ({ shown: !shown }));

  render() {
    const { shown } = this.state;

    return (
      <div
        style={{
          padding: 25,
        }}
      >
        <Popover
          showArrow
          placement="right"
          dataHook="story-popover-append-to"
          shown={shown}
          {...this.props}
        >
          <Popover.Element>
            <Button onClick={this.toggle}>Click me to toggle</Button>
          </Popover.Element>
          <Popover.Content>
            <div style={{ padding: '12px 24px', textAlign: 'center' }}>
              I am the content!
            </div>
          </Popover.Content>
        </Popover>
      </div>
    );
  }
}

const Section = ({ appendToProp, children }) => (
  <div>
    <Markdown source={`#### \`appendTo="${appendToProp}"\``} />
    {children}
  </div>
);

export default () => (
  <div>
    <Section appendToProp="window">
      <Text>
        If you inspect the content, you'll see it is attached to a new div under
        the body.
      </Text>

      <PopoverWithState appendTo="window" />
    </Section>

    <Section appendToProp="parent">
      <Text>
        If you inspect the content, you'll see it is attached to a new div next
        to the target element (the Button).
      </Text>

      <PopoverWithState appendTo="parent" />
    </Section>

    <Section appendToProp="scrollParent">
      <Text>
        If you inspect the content, you'll see it is attached to a new div under
        the list container.
      </Text>
      <div
        style={{
          overflow: 'auto',
          height: 120,
          width: 400,
          border: '1px solid black',
          marginTop: 25,
        }}
      >
        <ul style={{ padding: '0 0 100px' }}>
          <PopoverWithState appendTo="scrollParent" />
        </ul>
      </div>
    </Section>
  </div>
);
