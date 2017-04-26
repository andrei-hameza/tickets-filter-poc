import React, { Component } from 'react';
import sortByPrice from '../../utils/sortByPrice';
import Header from '../Header';
import FiltersPanel from '../FiltersPanel';
import Heading from '../Heading';
import OptionsList from '../OptionsList';
import SearchResults from '../SearchResults';
import Tickets from '../Tickets';
import R from 'ramda';

const optionAllData = {
  id: 'stops#-1',
  label: 'Все',
  group: true,
  stops: -1
};

const optionsData = [{
  id: 'stops#0',
  label: 'Без пересадок',
  group: false,
  stops: 0
}, {
  id: 'stops#1',
  label: '1 пересадка',
  group: false,
  stops: 1
}, {
  id: 'stops#2',
  label: '2 пересадки',
  group: false,
  stops: 2
}, {
  id: 'stops#3',
  label: '3 пересадки',
  group: false,
  stops: 3
}];

const options = R.concat([optionAllData], optionsData);

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);

    // initial state
    this.state = {
      currentOptions: R.concat(optionsData, [optionAllData]),
      sortedTicketsData: []
    };
  }

  componentDidMount() {
    fetch('/tickets.json')
      .then(response => response.json())
      .then(data => this.setState(
        R.compose(
          R.merge(this.state),
          R.objOf('sortedTicketsData'),
          sortByPrice
        )(data.tickets)
      ));
  }

  handleAllOptionSelect({ checked }) {
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

  handleOptionSelect({ option, checked }) {
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

  handleOnlyOptionSelect({ option }) {
    const { currentOptions } = this.state;

    if (!R.equals(currentOptions, [option])) {
      const newState = R.objOf('currentOptions', [option]);
      this.setState(newState);
    }
  }

  handleSelect({ option, isOnly }) {
    if (isOnly) {
      return this.handleOnlyOptionSelect.apply(this, arguments);
    }
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
    const { currentOptions, sortedTicketsData } = this.state;
    const currentTicketsData = this.getCurrentTicketsData(currentOptions, optionAllData, sortedTicketsData);


    return (
      <div className="app l-wrap">
        <Header className="l-app" />
        <div className="app__main l-app">
          <FiltersPanel className="grid-item l-sidebar">
            <Heading
              className="filters-panel__heading"
              heading={'Количество пересадок'} />
            <OptionsList
              className="filters-panel__content"
              textField="label"
              valueField="id"
              groupField="group"
              onSelect={this.handleSelect}
              options={options}
              values={currentOptions} />
          </FiltersPanel>
          <SearchResults className="grid-item l-main">
            <Tickets tickets={currentTicketsData} />
          </SearchResults>
        </div>
      </div>
    );
  }
}

export default App;
