/* eslint-disable curly */
import moment from 'moment';
import I18n from '../I18n';

const DECIMAL_RADIX = 10;
const K_FORMAT = 1000;

export default (value = 0) => {
  const result = parseInt(value, DECIMAL_RADIX) / K_FORMAT;

  return result + 'k';
};
