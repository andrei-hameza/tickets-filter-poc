import R from 'ramda';

const carrierLogos = {
  TK: 'turkish-airlines.svg',
  S7: 'turkish-airlines.svg',
  SU: 'turkish-airlines.svg',
  BA: 'turkish-airlines.svg'
};

export default R.partialRight(R.prop, [carrierLogos]);
