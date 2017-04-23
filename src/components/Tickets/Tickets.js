import React, { PureComponent } from 'react';
import Ticket from '../Ticket';

class Tickets extends PureComponent {
  render() {
    const { tickets } = this.props;
    return (
      <ul className="tickets-list">
        {
          tickets.map((ticket, index) => {
            return (
              <li className="tickets-list__item" key={index}>
                <Ticket ticket={ticket} />
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default Tickets;
