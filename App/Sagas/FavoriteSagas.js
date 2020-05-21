/* eslint-disable curly */
import {call, put, select} from 'redux-saga/effects';

import FavoriteActions from '../Redux/FavoriteRedux';
import SessionActions, {SessionSelectors} from '../Redux/SessionRedux';

import {httpsCallable} from './Utils';
import {
  GET_FAVORITES,
  GET_FAVORITE_BY_ID,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from './Consts';

const {getUser} = SessionSelectors;

export function* getFavorites(api, action) {
  try {
    const response = yield httpsCallable(GET_FAVORITES, action.data);

    console.tron.log({getFavorites: response});

    if (response.data.ok) {
      yield put(FavoriteActions.getFavoritesSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
      yield put(SessionActions.setFavorite(response.data.payload));
    } else {
      yield put(FavoriteActions.getFavoritesFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(FavoriteActions.getFavoritesFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* addFavorite(api, action) {
  try {
    const response = yield httpsCallable(ADD_FAVORITE, action.data);

    console.tron.log({addFavorite: response});

    if (response.data.ok) {
      yield put(FavoriteActions.addFavoriteSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
      yield put(SessionActions.addFavorite(response.data.payload));
    } else {
      yield put(FavoriteActions.addFavoriteFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(FavoriteActions.addFavoriteFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* removeFavorite(api, action) {
  try {
    const response = yield httpsCallable(REMOVE_FAVORITE, action.data);

    console.tron.log({removeFavorite: response});

    if (response.data.ok) {
      yield put(FavoriteActions.removeFavoriteSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
      yield put(SessionActions.removeFavorite(response.data.payload));
    } else {
      yield put(FavoriteActions.removeFavoriteFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(FavoriteActions.removeFavoriteFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}
