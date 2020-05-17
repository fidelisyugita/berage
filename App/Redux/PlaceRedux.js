import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

import {DropDownHolder} from '../Components/DropDownHolder';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getPopularPlacesRequest: ['data', 'callback'],
  getPopularPlacesSuccess: ['payload'],
  getPopularPlacesFailure: ['error'],

  getRecommendedPlacesRequest: ['data', 'callback'],
  getRecommendedPlacesSuccess: ['payload'],
  getRecommendedPlacesFailure: ['error'],

  savePlaceRequest: ['data', 'callback'],
  savePlaceSuccess: ['payload'],
  savePlaceFailure: ['error'],
});

export const PlaceTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  getPopularPlaces: DEFAULT_STATE,
  getRecommendedPlaces: DEFAULT_STATE,
  savePlace: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const getPopularPlacesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getPopularPlaces: {...state.getPopularPlaces, fetching: true, data},
  });
};
export const getPopularPlacesSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getPopularPlaces: {fetching: false, error: null, payload, data: null},
  });
};
export const getPopularPlacesFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getPopularPlaces: {fetching: false, error, payload: null},
  });
};

export const getRecommendedPlacesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getRecommendedPlaces: {...state.getRecommendedPlaces, fetching: true, data},
  });
};
export const getRecommendedPlacesSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getRecommendedPlaces: {fetching: false, error: null, payload, data: null},
  });
};
export const getRecommendedPlacesFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getRecommendedPlaces: {fetching: false, error, payload: null},
  });
};

export const savePlaceRequest = (state, {data}) => {
  return state.merge({
    ...state,
    savePlace: {...state.savePlace, fetching: true, data},
  });
};
export const savePlaceSuccess = (state, {payload}) => {
  DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    savePlace: {fetching: false, error: null, payload, data: null},
  });
};
export const savePlaceFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    savePlace: {fetching: false, error, payload: null},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POPULAR_PLACES_REQUEST]: getPopularPlacesRequest,
  [Types.GET_POPULAR_PLACES_SUCCESS]: getPopularPlacesSuccess,
  [Types.GET_POPULAR_PLACES_FAILURE]: getPopularPlacesFailure,

  [Types.GET_RECOMMENDED_PLACES_REQUEST]: getRecommendedPlacesRequest,
  [Types.GET_RECOMMENDED_PLACES_SUCCESS]: getRecommendedPlacesSuccess,
  [Types.GET_RECOMMENDED_PLACES_FAILURE]: getRecommendedPlacesFailure,

  [Types.GET_POPULAR_PLACES_REQUEST]: savePlaceRequest,
  [Types.GET_POPULAR_PLACES_SUCCESS]: savePlaceSuccess,
  [Types.GET_POPULAR_PLACES_FAILURE]: savePlaceFailure,
});
