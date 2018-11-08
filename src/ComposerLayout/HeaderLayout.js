import React from 'react';
import PropTypes from 'prop-types';
import InfoIcon from 'wix-style-react/new-icons/Info';
import XIcon from 'wix-style-react/new-icons/X';
import styles from './HeaderLayout.scss';

import {Row} from './Row';


export const HeaderLayout = props => {
  const rightAlignedItems = (<div>
    {props.showInfoButton && <InfoIcon data-hook="info-button" onClick={props.onInfoButtonClick}/>}
    {props.showCloseButton && <XIcon data-hook="close-button" onClick={props.onCloseButtonClick}/>}
  </div>);

  const title = <div data-hook="title">{props.title}</div>;
  const sideActions = <div data-hook="side-actions">{props.sideActions}</div>;
  return (
    <div className={styles.headerLayout}>
      <Row
        rightAlignedItems={rightAlignedItems}
        centerAlignedItems={title}
        leftAlignedItems={sideActions}
        />
    </div>
  );
};

HeaderLayout.propTypes = {
  showCloseButton: PropTypes.bool,
  showInfoButton: PropTypes.bool,
  onCloseButtonClick: PropTypes.func,
  onInfoButtonClick: PropTypes.func,
  title: PropTypes.string,
  sideActions: PropTypes.node
};

HeaderLayout.defaultProps = {
  showCloseButton: true,
  showInfoButton: true
};