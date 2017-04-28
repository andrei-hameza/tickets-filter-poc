/*eslint-disable no-script-url */
import React from 'react';
import cn from 'classnames';
import './LinkButton.css';

const LinkButton = ({ className, children, href = 'javascript:void(0)', ...other }) => {

  return (
    <a href={href} className={cn('link-button', className)} {...other}>
      { children }
    </a>
  );
};

export default LinkButton;
