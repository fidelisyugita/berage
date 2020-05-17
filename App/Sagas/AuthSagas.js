import {call, put} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

import AuthActions from '../Redux/AuthRedux';
import SessionActions from '../Redux/SessionRedux';

export function* loginWithGoogle(api, action) {
  try {
    // Get the users ID token
    const data = yield GoogleSignin.signIn();
    console.tron.log({
      'GoogleSignin.signIn': data,
    });

    const currentUser = yield GoogleSignin.getTokens();
    console.tron.log({
      currentUser,
    });

    // Create a Google credential with the token
    const googleCredential = yield auth.GoogleAuthProvider.credential(
      data.idToken,
      currentUser.accessToken,
    );

    // Sign-in the user with the credential
    const firebaseUserCredential = yield auth().signInWithCredential(
      googleCredential,
    );
    console.tron.log({firebaseUserCredential});

    const user = {
      phoneNumber: firebaseUserCredential.user.phoneNumber,
      photoURL: firebaseUserCredential.user.photoURL,
      displayName: firebaseUserCredential.user.displayName,
      email: firebaseUserCredential.user.email,
      isAnonymous: firebaseUserCredential.user.isAnonymous,
      emailVerified: firebaseUserCredential.user.emailVerified,
      uid: firebaseUserCredential.user.uid,
    };

    yield put(SessionActions.saveUser(user));
    yield put(AuthActions.loginWithGoogleSuccess({ok: true}));
    action.callback({ok: true});
  } catch (error) {
    yield put(AuthActions.loginWithGoogleFailure(error));
    action.callback({ok: false});
  }
}

export function* logout(api, action) {
  try {
    const firebaseUserCredential = yield auth().signOut();
    console.tron.log({firebaseUserCredential});

    yield put(SessionActions.removeUser());
    yield put(AuthActions.logoutSuccess({ok: true}));
  } catch (error) {
    yield put(AuthActions.logoutFailure(error));
  }
}
