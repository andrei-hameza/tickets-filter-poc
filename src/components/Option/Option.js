import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Option extends PureComponent {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {
      option,
      onChange
    } = this.props;

    onChange(option, e.target.checked, e);
  }

  render() {
    const {
      children,
      isSelected
    } = this.props;

    return (
      <label>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={this.handleChange} />
          { children }
      </label>
    );
  };
}

Option.propTypes = {
  option: PropTypes.any,
  isSelected: PropTypes.bool,
  onChange: PropTypes.func
};

Option.defaultProps = {
  option: {},
  isSelected: false,
  onChange: () => {}
};

export default Option;
