/* eslint-disable curly */
import moment from 'moment';
import I18n from '../I18n';

const DECIMAL_RADIX = 10;

export default (value = 0, dividedBy = 1, decimalPoints = 2) => {
  const val = parseFloat(value);
  const div = parseFloat(dividedBy);
  const dec = parseInt(decimalPoints, DECIMAL_RADIX);

  if (isNaN(val) || isNaN(div) || isNaN(dec)) return 0;

  return (val / div).toFixed(dec);
};
