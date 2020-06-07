/* eslint-disable curly */
import moment from 'moment';
import I18n from '../I18n';

const DECIMAL_RADIX = 10;
const K_FORMAT = 1000;

export default (value = 0) => {
  let result = 0;

  if (value) {
    const parsedValue = parseInt(value, DECIMAL_RADIX);
    if (parsedValue > K_FORMAT) result = `${parsedValue / K_FORMAT}k`;
    else result = parsedValue;
  }

  return result;
};
