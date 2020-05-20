/* eslint-disable curly */
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import I18n from '../I18n';

export default async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await Geolocation.getCurrentPosition(
        position => {
          console.tron.log({position});
          return position.coords;
        },
        error => {
          console.tron.log({error});
          throw error;
        },
      );
    } else {
      console.tron.log({error: 'permission'});
      throw {message: I18n.t('permissionDenied')};
    }
  } catch (error) {
    console.tron.log({error});
    throw error;
  }
};
