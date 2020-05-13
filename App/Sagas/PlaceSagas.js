import {call, put} from 'redux-saga/effects';
import functions from '@react-native-firebase/functions';

import PlaceActions from '../Redux/PlaceRedux';

export function* getPopularPlaces(api, action) {
  const {username} = action;

  try {
    // yield firebase.auth().signInAnonymously();
    // const idToken = yield firebase.auth().currentUser.getIdToken(true);

    // make the call to the api
    const response = yield functions().httpsCallable('place-popular')();

    console.tron.log({
      getPopularPlaces: response,
    });

    if (response.data.ok) {
      yield put(PlaceActions.getPopularPlacesSuccess(response.data.payload));
      action.callback({ok: true});
    } else {
      yield put(PlaceActions.getPopularPlacesFailure(response));
      action.callback({ok: false});
    }
  } catch (error) {
    yield put(PlaceActions.getPopularPlacesFailure(error));
    action.callback({ok: false});
  }
}
