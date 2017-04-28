import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '../CheckIcon';
import './Checkbox.css';
import cn from 'classnames';

const Checkbox = (props) => {
  const {
    id,
    isChecked,
    onChange,
    children,
    className,
    ...other
  } = props;

  return (
    <div
      className={ cn('checkbox', className, { 'checkbox_checked': isChecked }) }
      {...other} >
      <input
        className="checkbox__input"
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onChange} />
      <label
        className="checkbox__label"
        htmlFor={id} >
        <span className="checkbox__icon">
          <CheckIcon
            width="9"
            height="7" />
        </span>
        { children }
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  isChecked: false,
  onChange: () => {}
};

export default Checkbox;
