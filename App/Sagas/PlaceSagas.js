import {call, put} from 'redux-saga/effects';

import {httpsCallable} from './Utils';
import PlaceActions from '../Redux/PlaceRedux';

export function* getPopularPlaces(api, action) {
  try {
    const response = yield httpsCallable('place-popular', action.data);

    console.tron.log({getPopularPlaces: response});

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
