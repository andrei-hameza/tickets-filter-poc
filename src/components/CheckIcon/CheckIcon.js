import React from 'react';
import {
  pure
} from 'recompose';
import cn from 'classnames';

const CheckIcon = ({
  width,
  height,
  color = '#0CB2E1',
  className,
  ...other
}) => {
  const viewBox = `0 0 ${width} ${height}`;
  return (
    <svg
      {...other}
      width={width}
      height={height}
      className={cn('check-icon', className)}
      viewBox={viewBox}>
      <path d="M1.5 3.5l2 2 4-4" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default pure(CheckIcon);
