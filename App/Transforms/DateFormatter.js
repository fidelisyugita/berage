import moment from 'moment';
import I18n from '../I18n';

export default (
  date,
  format = 'YYYY-MM-DD hh:mm:ss',
  returnFormat = 'M/D/YY',
) => {
  const a = moment(date, format);
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
