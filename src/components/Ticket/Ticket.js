import React, { PureComponent } from 'react';

class Ticket extends PureComponent {
  render() {
    const { ticket } = this.props;
    return (
      <div className="ticket">
        <div className="ticket__card">
          <div className="ticket__carrier">{ticket.carrier}</div>
          <div className="ticket__purchase-button">{ticket.price}</div>
        </div>
        <div className="ticket__metadata">
          <div className="ticket__origin">
            <div className="ticket__departure-time">{ticket.departure_time}</div>
            <div className="ticket__origin-name">{ticket.origin_name}</div>
            <div className="ticket__departure-date">{ticket.departure_date}</div>
          </div>
          <div className="ticket__stops-amount">{ticket.stops}</div>
          <div className="ticket__destination">
            <div className="ticket__arrival-time">{ticket.arrival_time}</div>
            <div className="ticket__destination-name">{ticket.destination_name}</div>
            <div className="ticket__arrival-date">{ticket.arrival_date}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Ticket;
