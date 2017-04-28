import R from 'ramda';
import formatOrigin from './formatOrigin';
import formatDestination from './formatDestination';
import formatTime from './formatTime';
import formatDate from './formatDate';
import formatPrice from './formatPrice';
import formatStops from './formatStops';
import getCarrierLogoUrl from './getCarrierLogoUrl';

const formatTicketsData = (ticketsData) => {
  return ticketsData.map((ticket) => {
    return {
      origin: formatOrigin.apply(null, R.props(['origin', 'origin_name'], ticket)),
      destination: formatDestination.apply(null, R.props(['destination', 'destination_name'], ticket)),
      price: formatPrice(R.prop('price', ticket)),
      stops: formatStops(R.prop('stops', ticket)),
      stopsAmount: R.prop('stops', ticket),
      carrierLogo: getCarrierLogoUrl(R.prop('carrier', ticket)),
      carrierName: R.prop('carrier', ticket),
      departureDate: formatDate(R.prop('departure_date', ticket)),
      departureTime: formatTime(R.prop('departure_time', ticket)),
      arrivalDate: formatDate(R.prop('arrival_date', ticket)),
      arrivalTime: formatTime(R.prop('arrival_time', ticket))
    };
  });
};

export default formatTicketsData;
