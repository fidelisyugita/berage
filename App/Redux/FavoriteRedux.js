import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

import {DropDownHolder} from '../Components/DropDownHolder';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getFavoritesRequest: ['data', 'callback'],
  getFavoritesSuccess: ['payload'],
  getFavoritesFailure: ['error'],

  getFavoriteRequest: ['data', 'callback'],
  getFavoriteSuccess: ['payload'],
  getFavoriteFailure: ['error'],

  addFavoriteRequest: ['data', 'callback'],
  addFavoriteSuccess: ['payload'],
  addFavoriteFailure: ['error'],

  removeFavoriteRequest: ['data', 'callback'],
  removeFavoriteSuccess: ['payload'],
  removeFavoriteFailure: ['error'],
});

export const FavoriteTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  getFavorites: DEFAULT_STATE,
  getFavorite: DEFAULT_STATE,
  addFavorite: DEFAULT_STATE,
  removeFavorite: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const getFavoritesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getFavorites: {...state.getFavorites, fetching: true, data},
  });
};
export const getFavoritesSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getFavorites: {fetching: false, error: null, payload, data: null},
  });
};
export const getFavoritesFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getFavorites: {fetching: false, error, payload: null},
  });
};

export const getFavoriteRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getFavorite: {...state.getFavorite, fetching: true, data},
  });
};
export const getFavoriteSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getFavorite: {fetching: false, error: null, payload, data: null},
  });
};
export const getFavoriteFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getFavorite: {fetching: false, error, payload: null},
  });
};

export const addFavoriteRequest = (state, {data}) => {
  return state.merge({
    ...state,
    addFavorite: {...state.addFavorite, fetching: true, data},
  });
};
export const addFavoriteSuccess = (state, {payload}) => {
  DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    addFavorite: {fetching: false, error: null, payload, data: null},
  });
};
export const addFavoriteFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    addFavorite: {fetching: false, error, payload: null},
  });
};

export const removeFavoriteRequest = (state, {data}) => {
  return state.merge({
    ...state,
    removeFavorite: {...state.removeFavorite, fetching: true, data},
  });
};
export const removeFavoriteSuccess = (state, {payload}) => {
  DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    removeFavorite: {fetching: false, error: null, payload, data: null},
  });
};
export const removeFavoriteFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    removeFavorite: {fetching: false, error, payload: null},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_FAVORITES_REQUEST]: getFavoritesRequest,
  [Types.GET_FAVORITES_SUCCESS]: getFavoritesSuccess,
  [Types.GET_FAVORITES_FAILURE]: getFavoritesFailure,

  [Types.GET_FAVORITE_REQUEST]: getFavoriteRequest,
  [Types.GET_FAVORITE_SUCCESS]: getFavoriteSuccess,
  [Types.GET_FAVORITE_FAILURE]: getFavoriteFailure,

  [Types.ADD_FAVORITE_REQUEST]: addFavoriteRequest,
  [Types.ADD_FAVORITE_SUCCESS]: addFavoriteSuccess,
  [Types.ADD_FAVORITE_FAILURE]: addFavoriteFailure,

  [Types.REMOVE_FAVORITE_REQUEST]: removeFavoriteRequest,
  [Types.REMOVE_FAVORITE_SUCCESS]: removeFavoriteSuccess,
  [Types.REMOVE_FAVORITE_FAILURE]: removeFavoriteFailure,
});
