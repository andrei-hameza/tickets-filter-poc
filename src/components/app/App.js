import React, { Component } from 'react';
import './App.css';
import ticketsData from '../../utils/fakeData';
import Tickets from '../tickets';

class App extends Component {
  render() {
    return (
      <Tickets tickets={ticketsData} />
    );
  }
}

export default App;
