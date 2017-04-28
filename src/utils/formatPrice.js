import currencyFormatter from 'currency-formatter';

export default (price) => currencyFormatter.format(parseInt(price, 10), {
  symbol: 'Р',
  thousand: ' ',
  precision: 0,
  format: '%v %s'
});
