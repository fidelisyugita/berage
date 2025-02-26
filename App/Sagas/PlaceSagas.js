/* eslint-disable curly */
import {call, put} from 'redux-saga/effects';

import PlaceActions from '../Redux/PlaceRedux';

import {httpsCallable} from './Utils';
import {
  GET_PLACES,
  GET_POPULAR_PLACES,
  GET_RECOMMENDED_PLACES,
  SAVE_PLACE,
  USER_PLACES,
  SET_POPULAR,
  SET_RECOMMENDED,
} from './Consts';

export function* getPlaces(api, action) {
  try {
    const response = yield httpsCallable(GET_PLACES, action.data);

    console.tron.log({getPlaces: response});

    if (response.data.ok) {
      yield put(PlaceActions.getPlacesSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(PlaceActions.getPlacesFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(PlaceActions.getPlacesFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* getPopularPlaces(api, action) {
  try {
    const response = yield httpsCallable(GET_POPULAR_PLACES, action.data);

    console.tron.log({getPopularPlaces: response});

    if (response.data.ok) {
      yield put(PlaceActions.getPopularPlacesSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(PlaceActions.getPopularPlacesFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(PlaceActions.getPopularPlacesFailure(error));
    if (action.callback) action.callback({ok: false});
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
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(PlaceActions.getRecommendedPlacesFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(PlaceActions.getRecommendedPlacesFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* savePlace(api, action) {
  try {
    const response = yield httpsCallable(SAVE_PLACE, action.data);

    console.tron.log({savePlace: response});

    if (response.data.ok) {
      yield put(PlaceActions.savePlaceSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(PlaceActions.savePlaceFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(PlaceActions.savePlaceFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* getUserPlaces(api, action) {
  try {
    const response = yield httpsCallable(USER_PLACES, action.data);

    console.tron.log({getUserPlaces: response});

    if (response.data.ok) {
      yield put(PlaceActions.getUserPlacesSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(PlaceActions.getUserPlacesFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(PlaceActions.getUserPlacesFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* setPopular(api, action) {
  try {
    const response = yield httpsCallable(SET_POPULAR, action.data);

    console.tron.log({setPopular: response});

    if (response.data.ok) {
      yield put(PlaceActions.setPopularSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(PlaceActions.setPopularFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(PlaceActions.setPopularFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* setRecommended(api, action) {
  try {
    const response = yield httpsCallable(SET_RECOMMENDED, action.data);

    console.tron.log({setRecommended: response});

    if (response.data.ok) {
      yield put(PlaceActions.setRecommendedSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(PlaceActions.setRecommendedFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(PlaceActions.setRecommendedFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}
