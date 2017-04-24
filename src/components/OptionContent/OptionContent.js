import React from 'react';
import {
  pure
} from 'recompose';

const OptionContent = ({ value, hasButton, onClick }) => {

  return (
    <span className="option__content">
      <span>{value}</span>
      {hasButton && (<span className="option__button" onClick={onClick}>Только</span>)}
    </span>
  );
};

export default pure(OptionContent);
