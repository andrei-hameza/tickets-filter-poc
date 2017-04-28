import React from 'react';
import PropTypes from 'prop-types';
import {
  pure
} from 'recompose';
import cn from 'classnames';
import './Metadata.css';

const Metadata = ({ className, metadataTime, metadataName, metadataDate, ...other }) => {

  return (
    <div className={cn('metadata', className)} {...other}>
      <div className="metadata__time">{metadataTime}</div>
      <div className="metadata__name">{metadataName}</div>
      <div className="metadata__date">{metadataDate}</div>
    </div>
  );
};

Metadata.propTypes = {
  metadataTime: PropTypes.string,
  metadataName: PropTypes.string,
  metadataDate: PropTypes.string
};

export default pure(Metadata);
