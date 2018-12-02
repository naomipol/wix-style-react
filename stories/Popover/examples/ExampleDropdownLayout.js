import React from 'react';

import Popover from 'wix-style-react/Popover';
import Button from 'wix-style-react/Button';
import DropdownLayout from 'wix-style-react/DropdownLayout';

class ExampleDropdownLayout extends React.Component {
  state = {
    selectedId: -1,
    selectedValue: 'Click me!',
    shown: false,
  };

  dropdownLayoutRef = null;

  open = () => this.setState({ shown: true });
  close = () => this.setState({ shown: false });
  toggle = () => this.setState(({ shown }) => ({ shown: !shown }));

  onKeyDown = e => {
    if (this.dropdownLayoutRef) {
      const eventHandled = this.dropdownLayoutRef._onKeyDown(e);

      if (eventHandled) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };

  onSelect = ({ id: selectedId, value: selectedValue }) => {
    this.setState({
      selectedId,
      selectedValue,
      shown: false,
    });
  };

  render() {
    const { selectedId, selectedValue, shown } = this.state;

    return (
      <div
        style={{
          textAlign: 'center',
          padding: 50,
        }}
      >
        <div>Notice how the Popover position is always in the viewport.</div>
        <br />

        <Popover
          dataHook="story-popover-dropdown-layout"
          shown={shown}
          showArrow
          placement="bottom"
          appendTo="parent"
          onClickOutside={this.close}
          onKeyDown={this.onKeyDown}
        >
          <Popover.Element>
            <Button onClick={this.toggle}>{selectedValue}</Button>
          </Popover.Element>
          <Popover.Content>
            <div style={{ padding: '6px 0' }}>
              <DropdownLayout
                ref={r => (this.dropdownLayoutRef = r)}
                minWidthPixels={200}
                selectedId={selectedId}
                onSelect={this.onSelect}
                options={[
                  { id: 0, value: 'Option 1' },
                  { id: 1, value: 'Option 2' },
                  { id: 2, value: 'Option 3' },
                  { id: 3, value: 'Option 4' },
                ]}
                visible
                inContainer
              />
            </div>
          </Popover.Content>
        </Popover>
      </div>
    );
  }
}

export default ExampleDropdownLayout;
