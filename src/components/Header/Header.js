import React from 'react';
import {
  pure
} from 'recompose';
import cn from 'classnames';
import './Header.css';

const Header = ({ className, ...other }) => {

  return (
    <header className={cn('app__header', className)} {...other}>
      <a href="javascript:void(0)" className="app__header__logo"></a>
    </header>
  );
};

export default pure(Header);
