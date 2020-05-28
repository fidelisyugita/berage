/* eslint-disable curly */
import {call, put} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import messaging from '@react-native-firebase/messaging';

import AuthActions from '../Redux/AuthRedux';
import SessionActions from '../Redux/SessionRedux';
import FavoriteActions from '../Redux/FavoriteRedux';
import PlaceActions from '../Redux/PlaceRedux';
import ChatActions from '../Redux/ChatRedux';
import InboxActions from '../Redux/InboxRedux';

import {httpsCallable} from './Utils';
import {SAVE_USER} from './Consts';

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
    console.tron.log({
      'GoogleSignin.getTokens': currentUser,
    });

    // Create a Google credential with the token
    const googleCredential = yield auth.GoogleAuthProvider.credential(
      data.idToken,
      currentUser.accessToken,
    );
    console.tron.log({
      googleCredential,
    });

    // Sign-in the user with the credential
    const firebaseUserCredential = yield auth().signInWithCredential(
      googleCredential,
    );
    console.tron.log({firebaseUserCredential});

    const fcmToken = yield messaging().getToken();
    const response = yield httpsCallable(SAVE_USER, {fcmToken});
    console.tron.log({saveUser: response});

    /**
     * TODO
     * should get user data from api
     * make sure its updated
     */
    const user = {
      phoneNumber: firebaseUserCredential.user.phoneNumber,
      photoURL: firebaseUserCredential.user.photoURL,
      displayName: firebaseUserCredential.user.displayName,
      email: firebaseUserCredential.user.email,
      isAnonymous: firebaseUserCredential.user.isAnonymous,
      emailVerified: firebaseUserCredential.user.emailVerified,
      uid: firebaseUserCredential.user.uid,
      fcmToken,
    };
    console.tron.log({user});

    yield put(SessionActions.saveUser(user));
    yield put(AuthActions.loginWithGoogleSuccess({ok: true}));
    if (action.callback) action.callback({ok: true});
  } catch (error) {
    yield put(AuthActions.loginWithGoogleFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* logout(api, action) {
  try {
    yield GoogleSignin.signOut();
    const firebaseUserCredential = yield auth().signOut();
    console.tron.log({firebaseUserCredential});

    yield put(SessionActions.logout());
    yield put(AuthActions.logoutSuccess({ok: true}));
    // check everything from user & remove
    yield put(FavoriteActions.removeFavorites());
    yield put(PlaceActions.removeMyPlaces());
    yield put(ChatActions.removeRooms());
    yield put(InboxActions.removeInboxes());
  } catch (error) {
    yield put(AuthActions.logoutFailure(error));
  }
}
