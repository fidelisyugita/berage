/* eslint-disable curly */
import moment from 'moment';
import I18n from '../I18n';

const H_TO_M = 60;

/**
 * Returns a new estimated drive time.
 * @param distance is a number and in km
 * @param speed is a number and in km/h
 */
export default (distance = 0, speed = 20) => {
  const distanceValue = parseFloat(distance);
  const speedValue = parseFloat(speed);

  if (isNaN(distanceValue) || isNaN(speedValue)) return null;

  return ((distanceValue / speedValue) * H_TO_M).toFixed(0);
};
