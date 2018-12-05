import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import { buttonDriverFactory } from '../../Button/Button.driver';

export default ({ element, wrapper, component, upgrade }) => {
  if (upgrade) {
    return buttonDriverFactory(element);
  } else {
    return {
      exists: () => !!element,
      click: () => ReactTestUtils.Simulate.click(element),
      focus: () => ReactTestUtils.Simulate.focus(element),
      blur: () => ReactTestUtils.Simulate.blur(element),
      mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(element),
      mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(element),
      getButtonTextContent: () => element.textContent,
      isButtonDisabled: () => element.getAttribute('disabled') === '',
      isPrefixIconExists: () => element.innerHTML.indexOf('prefix') !== -1,
      isSuffixIconExists: () => element.innerHTML.indexOf('suffix') !== -1,
      setProps: props => {
        const ClonedWithProps = React.cloneElement(
          component,
          Object.assign({}, component.props, props),
          ...(component.props.children || []),
        );
        ReactDOM.render(
          <div ref={r => (element = r)}>{ClonedWithProps}</div>,
          wrapper,
        );
      },
    };
  }
};
