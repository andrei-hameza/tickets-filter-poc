import React, { Component } from 'react';
import sortByPrice from '../../utils/sortByPrice';
import formatTicketsData from '../../utils/formatTicketsData';
import generateFiltersConfig from '../../utils/generateFiltersConfig';
import Header from '../Header';
import FiltersPanel from '../FiltersPanel';
import Heading from '../Heading';
import OptionsList from '../OptionsList';
import SearchResults from '../SearchResults';
import Tickets from '../Tickets';
import R from 'ramda';
import Perf from 'react-addons-perf';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);

    // initial state
    this.state = {
      currentOptions: [],
      options: [],
      sortedTicketsData: []
    };
  }

  componentDidMount() {
    fetch('/tickets.json')
      .then(response => response.json())
      .then(data => R.compose(
          sortByPrice,
          formatTicketsData
        )(data.tickets)
      ).then(formattedData => {
        const options = generateFiltersConfig(formattedData);
        this.setState({
          sortedTicketsData: formattedData,
          options,
          currentOptions: R.clone(options)
        });
      });
  }

  componentDidUpdate() {
    Perf.stop();
    Perf.printInclusive();
    Perf.printWasted();
  }

  handleAllOptionSelect({ checked }) {
    const newState = R.pipe(
      R.ifElse(
        R.equals(true),
        R.always(R.clone(this.state.options)),
        R.always([])
      ),
      R.objOf('currentOptions'),
      R.merge(this.state)
    )(checked);

    Perf.start();
    this.setState(newState);
  }

  handleOptionSelect({ option, checked }) {
    const {
      currentOptions,
      options
    } = this.state;

    const findGroupItem = R.find(R.propEq('group', true));

    const newState = R.pipe(
      R.ifElse(
        R.equals(true),
        R.always(R.concat([option], currentOptions)),
        R.always(R.reject(R.equals(option), currentOptions))
      ),
      R.ifElse(
        R.pipe(
          R.symmetricDifference(
            R.reject(R.propEq('group', true))(options)
          ),
          R.isEmpty
        ),
        R.concat([findGroupItem(options)]),
        R.reject(R.equals(findGroupItem(options)))
      ),
      R.objOf('currentOptions'),
      R.merge(this.state)
    )(checked);

    Perf.start();
    this.setState(newState);
  }

  handleOnlyOptionSelect({ option }) {
    const { currentOptions } = this.state;

    if (!R.equals(currentOptions, [option])) {
      const newState = R.objOf('currentOptions', [option]);
      Perf.start();
      this.setState(newState);
    }
  }

  handleSelect({ option, isOnly }) {
    if (isOnly) {
      return this.handleOnlyOptionSelect.apply(this, arguments);
    }
    if (R.prop('group', option)) {
      return this.handleAllOptionSelect.apply(this, arguments);
    }
    return this.handleOptionSelect.apply(this, arguments);

  }

  getCurrentTicketsData(currentOptions, sortedTicketsData) {
    if (R.find(R.propEq('group', true))(currentOptions)) {
      return R.clone(sortedTicketsData);
    }
    const indexedCurrentOptions = R.indexBy(R.prop('stops'), currentOptions);
    const testPropInIndexedCurrentOptions = R.partialRight(R.prop, [indexedCurrentOptions]);
    const filterByStopsPredicate = (item) => testPropInIndexedCurrentOptions(R.prop('stopsAmount', item));
    return R.filter(filterByStopsPredicate, sortedTicketsData);
  }

  render() {
    const {
      currentOptions,
      sortedTicketsData,
      options
    } = this.state;

    const currentTicketsData = this.getCurrentTicketsData(
      currentOptions,
      sortedTicketsData
    );

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
