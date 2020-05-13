import {put, select} from 'redux-saga/effects';
import GithubActions, {GithubSelectors} from '../Redux/GithubRedux';
import {is} from 'ramda';

import {GoogleSignin} from '@react-native-community/google-signin';
import Secrets from 'react-native-config';
import functions from '@react-native-firebase/functions';

// exported to make available for tests
export const selectAvatar = GithubSelectors.selectAvatar;

// process STARTUP actions
export function* startup(action) {
  GoogleSignin.configure({
    webClientId: Secrets.WEB_CLIENT_ID,
  });

  if (__DEV__ && console.tron) {
    functions().useFunctionsEmulator('http://localhost:5001');

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
  const avatar = yield select(selectAvatar);
  // only get if we don't have it yet
  if (!is(String, avatar)) {
    yield put(GithubActions.userRequest('GantMan'));
  }
}
