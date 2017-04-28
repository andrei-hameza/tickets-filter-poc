/*eslint-disable no-script-url */
import React from 'react';
import cn from 'classnames';
import './Logo.css';

const Logo = ({ className, children, href = 'javascript:void(0)', ...other }) => {

  return (
    <a href={href} className={cn('clickable-logo', className)} {...other}>
      { children }
    </a>
  );
};

export default Logo;
