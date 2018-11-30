import React from 'react';

import ButtonOld from '../Backoffice/Button';
import ButtonNew from './Button';

const Button = props =>
  (props.upgrade && <ButtonNew {...props} />) || <ButtonOld {...props} />;

export default Button;
