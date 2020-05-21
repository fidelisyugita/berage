import {takeLatest, all} from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import {StartupTypes} from '../Redux/StartupRedux';
import {GithubTypes} from '../Redux/GithubRedux';

import {AuthTypes} from '../Redux/AuthRedux';
import {PlaceTypes} from '../Redux/PlaceRedux';
import {FavoriteTypes} from '../Redux/FavoriteRedux';

/* ------------- Sagas ------------- */

import {startup} from './StartupSagas';
import {getUserAvatar} from './GithubSagas';

import {loginWithGoogle, logout} from './AuthSagas';
import {
  getPopularPlaces,
  getRecommendedPlaces,
  savePlace,
  getUserPlaces,
} from './PlaceSagas';
import {getFavorites, addFavorite, removeFavorite} from './FavoriteSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(AuthTypes.LOGIN_WITH_GOOGLE_REQUEST, loginWithGoogle, api),
    takeLatest(AuthTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(PlaceTypes.GET_POPULAR_PLACES_REQUEST, getPopularPlaces, api),
    takeLatest(
      PlaceTypes.GET_RECOMMENDED_PLACES_REQUEST,
      getRecommendedPlaces,
      api,
    ),
    takeLatest(PlaceTypes.SAVE_PLACE_REQUEST, savePlace, api),
    takeLatest(PlaceTypes.GET_USER_PLACES_REQUEST, getUserPlaces, api),

    takeLatest(FavoriteTypes.GET_FAVORITES_REQUEST, getFavorites, api),
    takeLatest(FavoriteTypes.ADD_FAVORITE_REQUEST, addFavorite, api),
    takeLatest(FavoriteTypes.REMOVE_FAVORITE_REQUEST, removeFavorite, api),
  ]);
}
