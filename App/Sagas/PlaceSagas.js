import {call, put} from 'redux-saga/effects';

import PlaceActions from '../Redux/PlaceRedux';

import {httpsCallable} from './Utils';
import {GET_POPULAR_PLACES, GET_RECOMMENDED_PLACES, SAVE_PLACE} from './Consts';

export function* getPopularPlaces(api, action) {
  try {
    const response = yield httpsCallable(GET_POPULAR_PLACES, action.data);

    console.tron.log({getPopularPlaces: response});

    if (response.data.ok) {
      yield put(PlaceActions.getPopularPlacesSuccess(response.data.payload));
      action.callback({ok: true});
    } else {
      yield put(PlaceActions.getPopularPlacesFailure(response.data.error));
      action.callback({ok: false});
    }
  } catch (error) {
    yield put(PlaceActions.getPopularPlacesFailure(error));
    action.callback({ok: false});
  }
}

export function* getRecommendedPlaces(api, action) {
  try {
    const response = yield httpsCallable(GET_RECOMMENDED_PLACES, action.data);

    console.tron.log({getRecommendedPlaces: response});

    if (response.data.ok) {
      yield put(
        PlaceActions.getRecommendedPlacesSuccess(response.data.payload),
      );
      action.callback({ok: true});
    } else {
      yield put(PlaceActions.getRecommendedPlacesFailure(response.data.error));
      action.callback({ok: false});
    }
  } catch (error) {
    yield put(PlaceActions.getRecommendedPlacesFailure(error));
    action.callback({ok: false});
  }
}

export function* savePlace(api, action) {
  try {
    const response = yield httpsCallable(SAVE_PLACE, action.data);

    console.tron.log({savePlace: response});

    if (response.data.ok) {
      yield put(PlaceActions.savePlaceSuccess(response.data.payload));
      action.callback({ok: true});
    } else {
      yield put(PlaceActions.savePlaceFailure(response.data.error));
      action.callback({ok: false});
    }
  } catch (error) {
    yield put(PlaceActions.savePlaceFailure(error));
    action.callback({ok: false});
  }
}
