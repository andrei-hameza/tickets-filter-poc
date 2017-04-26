import React from 'react';
import {
  pure
} from 'recompose';
import './SearchResults.css';

const SearchResults = ({ children, ...other }) => {

  return (
    <div {...other}>
      <section className="search-results">
      { children }
      </section>
    </div>
  );
};

export default pure(SearchResults);
