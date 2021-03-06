import React from 'react';
import { string, bool } from 'prop-types';
import classNames from 'classnames';
import WixComponent from '../../BaseComponents/WixComponent';
import tpaStyleInjector from '../TpaStyleInjector';

let styles = { locals: {} };
try {
  styles = require('!css-loader?modules&camelCase&localIdentName="[path][name]__[local]__[hash:base64:5]"!sass-loader!./Input.scss');
} catch (e) {}

class Input extends WixComponent {
  static propTypes = {
    errorClassName: string,
    inputClassName: string,
    error: bool,
  };

  static defaultProps = {
    errorClassName: '',
    inputClassName: '',
    error: false,
  };

  constructor(props) {
    super(props);
    //Used for testing enviorment, to mock the styles
    //TODO: remove this line once css loader mock solution will be found
    styles = props.styles || styles;
  }

  get errorClassName() {
    return this.props.errorClassName || styles.locals.error;
  }

  getInputProps = () => {
    /* eslint-disable no-unused-vars */
    const {
      injectedStyles,
      styles,
      errorClassName,
      inputClassName,
      error,
      dataHook,
      ...inputProps
    } = this.props;
    return inputProps;
  };

  render() {
    const errorClassName = this.props.error === true ? this.errorClassName : '';
    const inputProps = this.getInputProps();

    return (
      <input
        className={classNames(
          styles.locals.input,
          this.props.inputClassName,
          errorClassName,
        )}
        {...inputProps}
      />
    );
  }
}

Input.displayName = 'Input';

export default tpaStyleInjector(Input, styles);
