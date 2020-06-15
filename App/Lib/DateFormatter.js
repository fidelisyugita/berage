import moment from 'moment';
import I18n from '../I18n';

const MILLISECOND = 1000;

/**
 * Returns a new readable date/time.
 * @param dateInput could be timestamp or object date from firebase
 */
export default (dateInput, returnFormat = 'M/D/YY') => {
  const tempDate =
    dateInput && dateInput._seconds
      ? new Date(dateInput._seconds * MILLISECOND)
      : new Date(dateInput);
  const a = moment(tempDate);
  const b = moment();

  const diffInDays = b.diff(a, 'days');
  // console.tron.log({diffInDays});

  // if (diffInDays === 0) {
  //   return I18n.t('today');
  // }
  // if (diffInDays === 1) {
  //   return I18n.t('yesterday');
  // }
  if (diffInDays > 0) {
    return a.format(returnFormat);
  }

  return a.fromNow();
};
