import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = (props) => {
  const {
    id,
    isChecked,
    onChange,
    children,
    ...other
  } = props;

  return (
    <label
      htmlFor={id}
      {...other} >
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={onChange} />
      { children }
    </label>
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
