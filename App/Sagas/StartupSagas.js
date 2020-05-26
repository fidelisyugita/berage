import {put, select} from 'redux-saga/effects';

import {GoogleSignin} from '@react-native-community/google-signin';
import Secrets from 'react-native-config';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';

import SessionActions, {SessionSelectors} from '../Redux/SessionRedux';

import I18n from '../I18n';
import {GetUserCoordinate} from '../Lib';

import {DropDownHolder} from '../Components/DropDownHolder';

const {getUser} = SessionSelectors;

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

  const currentUser = yield select(getUser);
  console.tron.log({currentUser});
  if (!currentUser) {
    // const userCredential = yield auth().signInAnonymously();
    // console.tron.log({userCredential});
  }

  if (__DEV__ && console.tron) {
    // functions().useFunctionsEmulator('http://localhost:5001');

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
        // someNormalFunction: selectAvatar,
      },
    });
  }
}
