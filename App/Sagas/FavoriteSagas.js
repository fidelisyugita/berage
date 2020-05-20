import {call, put} from 'redux-saga/effects';

import FavoriteActions from '../Redux/FavoriteRedux';

import {httpsCallable} from './Utils';
import {
  GET_FAVORITES,
  GET_FAVORITE_BY_ID,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from './Consts';

export function* getFavorites(api, action) {
  try {
    const response = yield httpsCallable(GET_FAVORITES, action.data);

    console.tron.log({getFavorites: response});

    if (response.data.ok) {
      yield put(FavoriteActions.getFavoritesSuccess(response.data.payload));
      action.callback({ok: true});
    } else {
      yield put(FavoriteActions.getFavoritesFailure(response.data.error));
      action.callback({ok: false});
    }
  } catch (error) {
    yield put(FavoriteActions.getFavoritesFailure(error));
    action.callback({ok: false});
  }
}

export function* getFavorite(api, action) {
  try {
    const response = yield httpsCallable(GET_FAVORITE_BY_ID, action.data);

    console.tron.log({getFavorite: response});

    if (response.data.ok) {
      yield put(FavoriteActions.getFavoriteSuccess(response.data.payload));
      action.callback({ok: true});
    } else {
      yield put(FavoriteActions.getFavoriteFailure(response.data.error));
      action.callback({ok: false});
    }
  } catch (error) {
    yield put(FavoriteActions.getFavoriteFailure(error));
    action.callback({ok: false});
  }
}

export function* addFavorite(api, action) {
  try {
    const response = yield httpsCallable(ADD_FAVORITE, action.data);

    console.tron.log({addFavorite: response});

    if (response.data.ok) {
      yield put(FavoriteActions.addFavoriteSuccess(response.data.payload));
      action.callback({ok: true});
    } else {
      yield put(FavoriteActions.addFavoriteFailure(response.data.error));
      action.callback({ok: false});
    }
  } catch (error) {
    yield put(FavoriteActions.addFavoriteFailure(error));
    action.callback({ok: false});
  }
}

export function* removeFavorite(api, action) {
  try {
    const response = yield httpsCallable(REMOVE_FAVORITE, action.data);

    console.tron.log({removeFavorite: response});

    if (response.data.ok) {
      yield put(FavoriteActions.removeFavoriteSuccess(response.data.payload));
      action.callback({ok: true});
    } else {
      yield put(FavoriteActions.removeFavoriteFailure(response.data.error));
      action.callback({ok: false});
    }
  } catch (error) {
    yield put(FavoriteActions.removeFavoriteFailure(error));
    action.callback({ok: false});
  }
}
