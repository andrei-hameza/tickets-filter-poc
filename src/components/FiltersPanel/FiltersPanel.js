import React from 'react';
import {
  pure
} from 'recompose';
import './FiltersPanel.css';

const FiltersPanel = ({ children, ...other }) => {

  return (
    <div {...other}>
      <section className="filters-panel">
        { children }
      </section>
    </div>
  );
};

export default pure(FiltersPanel);
