import React, { Component } from 'react';
import { ButtonNext } from 'wix-ui-core/button-next';
import cx from 'classnames';
import { button } from 'wix-ui-core/themes/backoffice';
import { string, node, oneOf, element, bool } from 'prop-types';

class Button extends Component {
  static displayName = 'Button';

  static propTypes = {
    /** Additional classes */
    className: string,
    /** Skins of Button content */
    skin: oneOf([
      'standard',
      'destructive',
      'premium',
      'dark',
      'light',
      'transparent',
    ]),
    /** Underline of Button content */
    priority: oneOf(['primary', 'secondary']),
    /** Size of Button content */
    size: oneOf(['tiny', 'small', 'medium', 'large']),
    /** Element based icon (svg, image etc.) */
    suffixIcon: element,
    /** Element based icon (svg, image etc.) */
    prefixIcon: element,
    /** Applies disabled styles */
    disabled: bool,
    /** String based node */
    children: node,
    /** String based data hook */
    dataHook: string,
    /** Flag to enable new button functionality */
    new: bool,
  };

  static defaultProps = {
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
    new: true,
  };

  render() {
    const {
      skin,
      priority,
      size,
      children,
      className,
      dataHook,
      ...rest
    } = this.props;

    const classNames = cx(className, button(skin, priority, size));

    return (
      <ButtonNext {...rest} data-hook={dataHook} className={classNames}>
        {children}
      </ButtonNext>
    );
  }
}

export default Button;
