/* eslint-disable curly */
import {put, select} from 'redux-saga/effects';

import {GoogleSignin} from '@react-native-community/google-signin';
import Secrets from 'react-native-config';
import functions from '@react-native-firebase/functions';
import auth from '@react-native-firebase/auth';
import {BackHandler} from 'react-native';

import SessionActions, {SessionSelectors} from '../Redux/SessionRedux';

import NavigationService from '../Services/NavigationService';

import I18n from '../I18n';
import {GetUserCoordinate} from '../Lib';

import {httpsCallable} from './Utils';
import {GET_CONSTANT} from './Consts';

import {DropDownHolder} from '../Components/DropDownHolder';

const {getUser} = SessionSelectors;

// process STARTUP actions
export function* startup(action) {
  GoogleSignin.configure({
    webClientId: Secrets.WEB_CLIENT_ID,
    iosClientId: Secrets.IOS_CLIENT_ID,
  });

  try {
    const response = yield httpsCallable(GET_CONSTANT, {});

    console.tron.log({getConstants: response});

    if (response.data.ok) {
      const {payload} = response.data;
      if (payload.maintenance) NavigationService.navigate('Maintenance');
      yield put(SessionActions.saveConstants(payload));
    } else {
      DropDownHolder.alert(
        'error',
        I18n.t('errorDefault'),
        response.data.error || I18n.t('tryAgain'),
      );
    }
  } catch (error) {
    console.tron.error({error});
    DropDownHolder.alert(
      'error',
      I18n.t('errorDefault'),
      error.message || I18n.t('tryAgain'),
    );
  }

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
    setTimeout(() => BackHandler.exitApp(), 10000);
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
