/* eslint-disable curly */
import {call, put} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import messaging from '@react-native-firebase/messaging';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

import I18n from '../I18n';

import AuthActions from '../Redux/AuthRedux';
import SessionActions from '../Redux/SessionRedux';
import FavoriteActions from '../Redux/FavoriteRedux';
import PlaceActions from '../Redux/PlaceRedux';
import ChatActions from '../Redux/ChatRedux';
import InboxActions from '../Redux/InboxRedux';
import BannerActions from '../Redux/BannerRedux';

import {httpsCallable} from './Utils';
import {SAVE_USER} from './Consts';

export function* loginWithGoogle(api, action) {
  console.log('loginWithGoogle started');
  try {
    // Get the users ID token
    const data = yield GoogleSignin.signIn();
    console.tron.log({
      'GoogleSignin.signIn': data,
    });
    console.log('GoogleSignin.signIn: ');
    console.log(data);

    const currentUser = yield GoogleSignin.getTokens();
    console.tron.log({
      currentUser,
    });
    console.tron.log({
      'GoogleSignin.getTokens': currentUser,
    });
    console.log('GoogleSignin.getTokens: ');
    console.log(currentUser);

    // Create a Google credential with the token
    const googleCredential = yield auth.GoogleAuthProvider.credential(
      data.idToken,
      currentUser.accessToken,
    );
    console.tron.log({
      googleCredential,
    });
    console.log('googleCredential: ');
    console.log(googleCredential);

    // Sign-in the user with the credential
    const firebaseUserCredential = yield auth().signInWithCredential(
      googleCredential,
    );
    console.tron.log({firebaseUserCredential});
    console.log('firebaseUserCredential: ');
    console.log(firebaseUserCredential);

    const fcmToken = yield messaging().getToken();
    const response = yield httpsCallable(SAVE_USER, {fcmToken});
    console.tron.log({response});
    console.log('response: ');
    console.log(response);

    let user = {
      phoneNumber: firebaseUserCredential.user.phoneNumber,
      photoURL: firebaseUserCredential.user.photoURL,
      displayName: firebaseUserCredential.user.displayName,
      email: firebaseUserCredential.user.email,
      isAnonymous: firebaseUserCredential.user.isAnonymous,
      emailVerified: firebaseUserCredential.user.emailVerified,
      uid: firebaseUserCredential.user.uid,
      fcmToken,
    };

    if (response.data.ok) user = {...user, ...response.data.payload};
    console.tron.log({user});

    yield put(SessionActions.saveUser(user));
    yield put(AuthActions.loginWithGoogleSuccess({ok: true}));
    if (action.callback) action.callback({ok: true});
  } catch (error) {
    yield put(AuthActions.loginWithGoogleFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* loginWithApple(api, action) {
  console.log('loginWithApple started');
  try {
    // Start the sign-in request
    const appleAuthRequestResponse = yield appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });
    console.log('appleAuthRequestResponse: ');
    console.log(appleAuthRequestResponse);

    let user = {
      email: appleAuthRequestResponse.email,
    };

    const {fullName} = appleAuthRequestResponse;
    if (fullName) {
      user = {
        ...user,
        displayName: `${fullName.givenName} ${fullName.familyName}`,
      };
    }

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      yield put(
        AuthActions.loginWithGoogleFailure({
          message: I18n.t('noIdentifyToken'),
        }),
      );
      if (action.callback) action.callback({ok: false});
    } else {
      // Create a Firebase credential from the response
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      // Sign the user in with the credential
      const firebaseUserCredential = yield auth().signInWithCredential(
        appleCredential,
      );
      console.tron.log({firebaseUserCredential});
      console.log('firebaseUserCredential: ');
      console.log(firebaseUserCredential);

      let fcmToken = null;
      let response = null;

      const hasPermission = yield messaging().requestPermission();
      console.log('hasPermission: ');
      console.log(hasPermission);
      if (hasPermission) {
        fcmToken = yield messaging().getToken();
        response = yield httpsCallable(SAVE_USER, {fcmToken});
        console.tron.log({response});
        console.log('response: ');
        console.log(response);
      }

      user = {
        ...user,
        fcmToken,
      };

      console.log('user: ');
      console.log(user);

      if (response && response.data && response.data.ok)
        user = {...user, ...response.data.payload};
      console.tron.log({user});

      yield put(SessionActions.saveUser(user));
      yield put(AuthActions.loginWithGoogleSuccess({ok: true}));
      if (action.callback) action.callback({ok: true});
    }
  } catch (error) {
    yield put(AuthActions.loginWithGoogleFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* logout(api, action) {
  try {
    if (GoogleSignin.isSignedIn()) yield GoogleSignin.signOut();
    const firebaseUserCredential = yield auth().signOut();
    console.tron.log({firebaseUserCredential});

    yield put(SessionActions.logout());
    yield put(AuthActions.logoutSuccess({ok: true}));
    // check everything from user & remove
    yield put(FavoriteActions.removeFavorites());
    yield put(PlaceActions.removeMyPlaces());
    yield put(ChatActions.removeRooms());
    // yield put(InboxActions.removeInboxes());
    // yield put(BannerActions.removeBanners());
  } catch (error) {
    yield put(AuthActions.logoutFailure(error));
  }
}
