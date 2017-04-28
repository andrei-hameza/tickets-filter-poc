import R from 'ramda';
import declint from 'declint-ru';

const formatPrice = R.partialRight(declint, [['%s пересадка', '%s пересадки', '%s пересадок']]);

export default (stops) => stops ? formatPrice(stops) : '';
