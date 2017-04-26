import React from 'react';
import Checkbox from '../Checkbox';
import OptionContent from '../OptionContent';
import {
  compose,
  mapProps,
  withHandlers,
  withState,
  onlyUpdateForKeys
} from 'recompose';
import './Option.css';

const enhance = compose(
  onlyUpdateForKeys(['isSelected']),
  withState('isOnly', 'updateValue', false),
  withHandlers((initialProps) => {
    const {
      onSelect,
      option
    } = initialProps;

    return {
      onChange: ({ updateValue, isOnly }) => event => {
        onSelect({
          option,
          checked: event.target.checked,
          isOnly,
          event
        });
        updateValue(false);
      },
      onClick: ({ updateValue }) => () => {
        updateValue(true);
      }
    };
  }),
  mapProps(props => {
    const {
      option,
      optionValue,
      onChange,
      isSelected,
      onClick,
      hasButton,
      isOnly, // eslint-disable-line no-unused-vars
      updateValue, // eslint-disable-line no-unused-vars
      ...other
    } = props;
    return {
      id: option.id,
      onChange,
      isChecked: isSelected,
      children: <OptionContent value={optionValue} hasButton={hasButton} onClick={onClick} />,
      ...other
    };
  }),
);

export default enhance(Checkbox);
