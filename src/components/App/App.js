import React, { Component } from 'react';
import './App.css';
import ticketsData from '../../utils/fakeData';
import sortByPrice from '../../utils/sortByPrice';
import Tickets from '../Tickets';
import OptionsList from '../OptionsList';
import R from 'ramda';

const sortedTicketsData = sortByPrice(ticketsData);

const optionAllData = {
  id: 'stops#all',
  label: 'Все',
  stops: 1000
};

const optionsData = [{
  id: 'stops#no',
  label: 'Без пересадок',
  stops: 0
}, {
  id: 'stops#1',
  label: '1 пересадка',
  stops: 1
}, {
  id: 'stops#2',
  label: '2 пересадки',
  stops: 2
}, {
  id: 'stops#3',
  label: '3 пересадки',
  stops: 3
}];

const options = R.concat([optionAllData], optionsData);

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);

    // initial state
    this.state = {
      currentOptions: R.concat(optionsData, [optionAllData])
    };
  }

  handleAllOptionSelect(option, checked) {
    const newState = R.pipe(
      R.ifElse(
        R.equals(true),
        R.always(R.concat(optionsData, [optionAllData])),
        R.always([])
      ),
      R.objOf('currentOptions'),
      R.merge(this.state)
    )(checked);
    this.setState(newState);
  }

  handleOptionSelect(option, checked) {
    const { currentOptions } = this.state;
    const newState = R.pipe(
      R.ifElse(
        R.equals(true),
        R.always(R.concat([option], currentOptions)),
        R.always(R.reject(R.equals(option), currentOptions))
      ),
      R.ifElse(
        R.pipe(
          R.symmetricDifference(optionsData),
          R.isEmpty
        ),
        R.concat([optionAllData]),
        R.reject(R.equals(optionAllData))
      ),
      R.objOf('currentOptions'),
      R.merge(this.state)
    )(checked);

    this.setState(newState);
  }

  handleSelect(option) {
    if (R.equals(option, optionAllData)) {
      return this.handleAllOptionSelect.apply(this, arguments);
    }
    return this.handleOptionSelect.apply(this, arguments);

  }

  getCurrentTicketsData(currentOptions, optionAllData, sortedTicketsData) {
    if (R.contains(optionAllData, currentOptions)) {
      return R.clone(sortedTicketsData);
    }
    const indexedCurrentOptions = R.indexBy(R.prop('stops'), currentOptions);
    const testPropInIndexedCurrentOptions = R.partialRight(R.prop, [indexedCurrentOptions]);
    const filterByStopsPredicate = (item) => testPropInIndexedCurrentOptions(R.prop('stops', item));
    return R.filter(filterByStopsPredicate, sortedTicketsData);
  }

  render() {
    const { currentOptions } = this.state;
    const currentTicketsData = this.getCurrentTicketsData(currentOptions, optionAllData, sortedTicketsData);


    return (
      <div>
        <OptionsList
          textField="label"
          valueField="id"
          onSelect={this.handleSelect}
          options={options}
          values={currentOptions} />
        <Tickets tickets={currentTicketsData} />
      </div>
    );
  }
}

export default App;
