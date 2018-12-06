import React from 'react';
import PropTypes from 'prop-types';

export const Snapshot = ({ name, children, padding, className }) => (
  <div className={className} data-snapshot name={name} style={{ padding }}>
    {children}
  </div>
);

Snapshot.propTypes = {
  name: PropTypes.string,
  children: PropTypes.any,
  padding: PropTypes.string,
  className: PropTypes.string,
};

Snapshot.defaultProps = {
  padding: '30px',
};
