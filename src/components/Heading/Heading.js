import React from 'react';
import PropTypes from 'prop-types';
import {
  pure
} from 'recompose';
import './Heading.css';

const Heading = ({ heading = '', ...other }) => {

  return (
    <h2 {...other}>
      { heading }
    </h2>
  );
};

Heading.propTypes = {
  heading: PropTypes.string
};

export default pure(Heading);
