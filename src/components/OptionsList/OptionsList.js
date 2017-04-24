import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Option from '../Option';
import cn from 'classnames';
import R from 'ramda';

class OptionsList extends PureComponent {

  render() {
    const {
      options,
      values,
      valueField,
      textField,
      groupField,
      className,
      onSelect
    } = this.props;

    const items = options.length ?
      options.map((option, index) => {
        const key = R.propOr(`option_${index}`, valueField, option);
        const isSelected = R.contains(option, values);
        const optionValue = R.prop(textField, option);
        const hasButton = !R.prop(groupField, option);
        return (
          <li
            key={key}
            className="options-list__item">
              <Option
                optionValue={optionValue}
                hasButton={hasButton}
                isSelected={isSelected}
                onSelect={onSelect}
                option={option}>
              </Option>
          </li>
        );
      })
      : null;

    return (
      <ul className={cn(className, 'options-list')}>
      {
        items
      }
      </ul>
    );
  };
}

OptionsList.propTypes = {
  options: PropTypes.array,
  values: PropTypes.array,
  onSelect: PropTypes.func,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  groupField: PropTypes.string,
  itemComponent: PropTypes.element
};

OptionsList.defaultProps = {
  options: [],
  values: [],
  defaultValues: [],
  onSelect: () => {}
};

export default OptionsList;
