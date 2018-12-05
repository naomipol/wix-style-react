import React from 'react';
import { Popover as CorePopover } from 'wix-ui-core/Popover';
import { buildChildrenObject } from 'wix-ui-core/dist/src/utils';
import PropTypes from 'prop-types';
import WixComponent from '../BaseComponents/WixComponent';

import style from './Popover.st.css';

class Popover extends WixComponent {
  static displayName = 'Popover';

  static Element = CorePopover.Element;
  static Content = CorePopover.Content;

  static propTypes = {
    ...CorePopover.propTypes,
    ...WixComponent.propTypes,

    /** Callback to be called when the user perform a click outside of the component */
    onClickOutside: PropTypes.func,
    /** The theme of the popover */
    theme: PropTypes.oneOf(['dark', 'light']),

    children: (props, propName) => {
      const childrenArr = React.Children.toArray(props[propName]);
      const childrenObj = buildChildrenObject(childrenArr, {
        Element: null,
        Content: null,
      });

      if (!childrenObj.Element) {
        return new Error(
          'Invalid children provided, <Popover.Element/> must be provided',
        );
      }

      if (!childrenObj.Content) {
        return new Error(
          'Invalid children provided, <Popover.Content/> must be provided',
        );
      }

      return childrenArr.reduce((err, child) => {
        if (
          !err &&
          (child.type.displayName !== 'Popover.Element' &&
            child.type.displayName !== 'Popover.Content')
        ) {
          return new Error(
            `Invalid children provided, unknown child <${child.type
              .displayName || child.type}/> supplied`,
          );
        }

        return err;
      }, false);
    },
  };

  static defaultProps = {
    appendTo: 'parent',
  };

  onClickOutside(e) {
    this.props.onClickOutside && this.props.onClickOutside(e);
  }

  // WixComponent is mainly used for the `onClickOutside` props, but is also
  // extending React.PureComponent. The <Popover/> component can't be a
  // PureComponent as it needs to update as frequently as possible to utilize
  // popper's positioning mechanism.
  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { dataHook, theme, ...rest } = this.props;

    return (
      <CorePopover
        {...rest}
        {...style('root', {
          theme
        }, this.props)}
      />
    );
  }
}

export default Popover;
