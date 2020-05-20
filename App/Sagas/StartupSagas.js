import {put, select} from 'redux-saga/effects';
import GithubActions, {GithubSelectors} from '../Redux/GithubRedux';
import {is} from 'ramda';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

import {GoogleSignin} from '@react-native-community/google-signin';
import Secrets from 'react-native-config';
import functions from '@react-native-firebase/functions';

import SessionActions from '../Redux/SessionRedux';

import I18n from '../I18n';
import {GetUserCoordinate} from '../Utils';

import {DropDownHolder} from '../Components/DropDownHolder';

// exported to make available for tests
export const selectAvatar = GithubSelectors.selectAvatar;

// process STARTUP actions
export function* startup(action) {
  GoogleSignin.configure({
    webClientId: Secrets.WEB_CLIENT_ID,
  });

  try {
    const coords = yield GetUserCoordinate();
    console.tron.log({getUserPosition: coords});
    yield put(SessionActions.saveUserLocation(coords));
  } catch (error) {
    console.tron.error({error});
    DropDownHolder.alert(
      'error',
      error.message || I18n.t('errorDefault'),
      I18n.t('needLocationAccess'),
    );
  }

  if (__DEV__ && console.tron) {
    // functions().useFunctionsEmulator('http://localhost:5001');

    // straight-up string logging
    console.tron.log("Hello, I'm an example of how to log via Reactotron.");

    // logging an object for better clarity
    console.tron.log({
      message: 'pass objects for better logging',
      someGeneratorFunction: selectAvatar,
    });

    // fully customized!
    const subObject = {a: 1, b: [1, 2, 3], c: true};
    subObject.circularDependency = subObject; // osnap!
    console.tron.display({
      name: '🔥 IGNITE 🔥',
      preview: 'You should totally expand this',
      value: {
        '💃': 'Welcome to the future!',
        subObject,
        someInlineFunction: () => true,
        someGeneratorFunction: startup,
        someNormalFunction: selectAvatar,
      },
    });
  }
}
