import R from 'ramda';
import formatStops from './formatStops';

const groupOption = {
  id: 'stops#-1',
  label: 'Все',
  group: true,
  stops: -1
};

const generateOption = (stops) => {

  return {
    id: `stops#${stops}`,
    label: formatStops(stops) || 'Без пересадок',
    group: false,
    stops: stops
  };
};

const generateFiltersConfig = (formattedTicketsData) =>
  R.pipe(
    R.pluck('stopsAmount'),
    R.uniq,
    R.map(generateOption),
    R.concat([groupOption]),
    R.sortBy(R.prop('stops'))
  )(formattedTicketsData);

export default generateFiltersConfig;
