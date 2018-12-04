# Modal component

> Generic modal container.

## Modal TestKit API

### Enzyme / ReactTestUtils

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| isOpen | - | boolean | true when to module is open |
| itThemeExist | string | boolean | true if theme <arg> exists in the modal |
| isScrollable | - | boolean | true if the modal is scrollable |
| clickOnOverlay | - | - | click on the modal overlay (helpful for testing if the modal is dismissed) |
| exists | - | boolean | true if the modal is on the DOM |
| setProps | json | element | returns a clone of this element with the new props from the json | 

## Usage

### Cleanup - Waiting For Modal To Close

In your tests, you should do proper cleanup after each test.
The Modal has a `closeTimeoutMS`, so if you leave it open, even if you unmount it, it will stay open for the `closeTimeoutMS` duration.
Notice that in the following examples we are waiting for the Modal to actually close.

### Example Enzyme

> In this example we'll demonstrating how to create a testkit for the `messageBoxFunctionalLayout`.

```javascript
import React from 'react';
import eventually from 'wix-eventually';
import {modalTestkitFactory as enzymeModalTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';

it('should do something', async ()=> {
  const dataHook = 'myDataHook';
  const wrapper = mount(<div/><Modal {...props} dataHook={dataHook}/></div>);
  const testkit = enzymeModalTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.isOpen()).toBeFalsy();

  // Create testkit for a Modal content component
  const messageBoxDriver = messageBoxFunctionalLayoutTestkitFactory({wrapper: document.body, dataHook: 'messageBox'});

  messageBoxDriver.clickOnConfirmationButton();

  // Cleanup
  wrapper.unmount();
  await eventually(() => !testkit.isOpen() || Promise.reject('Modal still open'));
});
```

### Example Plain React (ReactTestUtils)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import eventually from 'wix-eventually';
import {modalTestkitFactory} from 'wix-style-react/dist/testkit';

it('should do something', async ()=> {
  const div = document.createElement('div');
  const dataHook = 'myDataHook';
  const wrapper = div.appendChild(
    ReactTestUtils.renderIntoDocument(<div/><Modal {...props} dataHook={dataHook}/></div>, {dataHook})
  );
  const testkit = modalTestkitFactory({wrapper, dataHook});

  //Do tests
  expect(testkit.exists()).toBeTruthy();

  // Cleanup
  ReactDOM.unmountComponentAtNode(wrapper);
  await eventually(() => !testkit.isOpen() || Promise.reject('Modal still open'));
});
```

### Working With Modal Inner Components

The Modal renders the content onto the body. In order to get a testkit of a component in the content,
you need to set the `wrapper` as the `document.body`

> Enzyme TL;DR

```js
const wrapper = mount(<ModalExample/>);
const messageBoxDriver = messageBoxFunctionalLayoutTestkitFactory({wrapper: document.body, dataHook: 'messageBox'});
```

### Full example

> ModalExample.js

```js
import React from 'react';
import Modal from 'wix-style-react/Modal';
import Button from 'wix-style-react/Button';
import {MessageBoxFunctionalLayout} from 'wix-style-react/MessageBox';

class ModalExample extends React.Component {
  state = {open: false};

  handleToggleModal = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <Button dataHook="button" onClick={this.handleToggleModal}>Open Modal</Button>
        <Modal
          datahook="modal"
          isOpen={this.state.open}
        >
          <MessageBoxFunctionalLayout
            dataHook="messageBox"
            theme="blue"
            title="title"
            confirmText="OK"
            cancelText="Cancel"
            onOk={this.handleToggleModal}
            onCancel={this.handleToggleModal}
          >
            Hello blue world!
          </MessageBoxFunctionalLayout>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
```

> ModalExample.spec.js

```js
import 'jsdom-global/register';
import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import eventually from 'wix-eventually';
import ModalExample from './ModalExample';
//enzyme drivers
import {modalTestkitFactory, buttonTestkitFactory} from 'wix-style-react/dist/testkit/enzyme';
//vanila js drivers
import {messageBoxFunctionalLayoutTestkitFactory} from 'wix-style-react/dist/testkit';

describe('ModalExample', () => {
  it('renders the modal content correctly', async () => {
    // Render
     //mount the component using enzyme to a div that is placed on the body, as the modal will be portaled there
    mountingDiv = document.createElement('div');
    document.body.appendChild(mountingDiv);
    wrapper = mount(<ModalExample/>, {attachTo: mountingDiv});

    // create the Button and Modal drivers based on
    const buttonDriver = buttonTestkitFactory({wrapper, dataHook: 'button'});
    const modalDriver = modalTestkitFactory({wrapper, dataHook: 'modal'});

    //open the modal
    buttonDriver.click();
    expect(modalDriver.isOpen()).to.equal(true);

    //create the internal component driver based on the vanilla version, as you pass in an html node instead of an enzyme wrapper
    const messageBoxDriver = messageBoxFunctionalLayoutTestkitFactory({wrapper: document.body, dataHook: 'messageBox'});
    messageBoxDriver.clickOnConfirmationButton();

    // Cleanup
    wrapper.detach();
    document.body.removeChild(mountingDiv);
    await eventually(() => expect(modalDriver.isOpen()).to.equal(false)); // Modal has a closeTimeoutMS prop which is non-zeo by default
  });
});
```