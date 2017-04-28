/*eslint-disable no-script-url */
import React, { PureComponent } from 'react';
import Logo from '../Logo';
import LinkButton from '../LinkButton';
import Metadata from '../Metadata';
import './Ticket.css';
import cn from 'classnames';

class Ticket extends PureComponent {

  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseOver.bind(this, true);
    this.handleMouseLeave = this.handleMouseOver.bind(this, false);

    // initial state
    this.state = {
      isActive: false
    };
  }

  handleMouseOver(isActive) {
    this.setState({
      isActive
    });
  }

  render() {
    const { ticket } = this.props;
    const { isActive } = this.state;
    return (
      <div className={cn('ticket', { 'ticket_active': isActive })}>
        <div className="ticket__card">
          <Logo className="ticket__carrier">
            <img className="ticket__carrier__logo" src={ticket.carrierLogo} alt={ticket.carrierName}></img>
          </Logo>
          <LinkButton
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            href="javascript:void(0)"
            className="ticket__purchase-link">
            <span className="ticket__purchase-link__primary-text">
              Купить
            </span>
            <span className="ticket__purchase-link__secondary-text">
              за
            </span>
            <span className="ticket__purchase-link__price">
              {ticket.price}
            </span>
          </LinkButton>
        </div>
        <div className="ticket__details">
          <Metadata
            className="ticket__origin"
            metadataTime={ticket.departureTime}
            metadataName={ticket.origin}
            metadataDate={ticket.departureDate} />
          <div className="ticket__stops-amount">
            {ticket.stops}
          </div>
          <Metadata
            className="ticket__destination"
            metadataTime={ticket.arrivalTime}
            metadataName={ticket.destination}
            metadataDate={ticket.arrivalDate} />
        </div>
      </div>
    );
  }
}

export default Ticket;
