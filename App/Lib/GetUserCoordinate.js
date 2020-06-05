/* eslint-disable curly */
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import I18n from '../I18n';

export default () => {
  return new Promise((resolve, reject) => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )
      .then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              console.tron.log({position});
              resolve(position.coords);
            },
            error => {
              console.tron.log({error});
              reject(error);
            },
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 3000},
          );
        } else reject({message: I18n.t('permissionDenied')});
      })
      .catch(error => reject(error));
  });
};
