import React from 'react';

import ButtonOld from '../Backoffice/Button';
import ButtonNew from './Button';

const Button = props => {
  return (props.new && <ButtonNew {...props} />) || <ButtonOld {...props} />;
};

export default Button;
