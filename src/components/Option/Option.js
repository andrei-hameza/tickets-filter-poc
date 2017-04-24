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

const enhance = compose(
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
      hasButton
    } = props;
    return {
      id: option.id,
      onChange,
      isChecked: isSelected,
      children: <OptionContent value={optionValue} hasButton={hasButton} onClick={onClick} />
    };
  }),
  onlyUpdateForKeys(['isChecked'])
);

export default enhance(Checkbox);
