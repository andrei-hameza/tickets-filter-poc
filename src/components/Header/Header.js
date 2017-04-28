import React from 'react';
import Logo from '../Logo';
import {
  pure
} from 'recompose';
import cn from 'classnames';
import './Header.css';

const Header = ({ className, ...other }) => {

  return (
    <header className={cn('app__header', className)} {...other}>
      <Logo className="app__header__logo" href="/" />
    </header>
  );
};

export default pure(Header);
