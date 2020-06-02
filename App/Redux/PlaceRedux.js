/* eslint-disable curly */
import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

import {DropDownHolder} from '../Components/DropDownHolder';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getPlacesRequest: ['data', 'callback'],
  getPlacesSuccess: ['payload'],
  getPlacesFailure: ['error'],

  getPopularPlacesRequest: ['data', 'callback'],
  getPopularPlacesSuccess: ['payload'],
  getPopularPlacesFailure: ['error'],

  getRecommendedPlacesRequest: ['data', 'callback'],
  getRecommendedPlacesSuccess: ['payload'],
  getRecommendedPlacesFailure: ['error'],

  savePlaceRequest: ['data', 'callback'],
  savePlaceSuccess: ['payload'],
  savePlaceFailure: ['error'],

  getUserPlacesRequest: ['data', 'callback'],
  getUserPlacesSuccess: ['payload'],
  getUserPlacesFailure: ['error'],

  setPopularRequest: ['data', 'callback'],
  setPopularSuccess: ['payload'],
  setPopularFailure: ['error'],

  setRecommendedRequest: ['data', 'callback'],
  setRecommendedSuccess: ['payload'],
  setRecommendedFailure: ['error'],

  removeMyPlaces: null,
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
  myPlaces: [],
  getPlaces: DEFAULT_STATE,
  getPopularPlaces: DEFAULT_STATE,
  getRecommendedPlaces: DEFAULT_STATE,
  savePlace: DEFAULT_STATE,
  getUserPlaces: DEFAULT_STATE,
  setPopular: DEFAULT_STATE,
  setRecommended: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const removeMyPlaces = state => {
  return state.merge({...state, myPlaces: []});
};

export const getPlacesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getPlaces: {...state.getPlaces, fetching: true, data},
  });
};
export const getPlacesSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getPlaces: {fetching: false, error: null, payload, data: null},
  });
};
export const getPlacesFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getPlaces: {fetching: false, error, payload: null},
  });
};

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

  let tempMyPlaces = [...state.myPlaces];
  const sameDataIndex = tempMyPlaces.findIndex(
    place => place.id === payload.id,
  );
  console.tron.log({tempMyPlaces});
  console.tron.log({sameDataIndex});
  if (sameDataIndex > -1) tempMyPlaces.splice(sameDataIndex, 1, {...payload});
  else tempMyPlaces.push({...payload});

  console.tron.log({tempMyPlaces});

  return state.merge({
    ...state,
    savePlace: {fetching: false, error: null, payload, data: null},
    myPlaces: tempMyPlaces,
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

export const getUserPlacesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getUserPlaces: {...state.getUserPlaces, fetching: true, data},
  });
};
export const getUserPlacesSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getUserPlaces: {fetching: false, error: null, payload, data: null},
    myPlaces: payload,
  });
};
export const getUserPlacesFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getUserPlaces: {fetching: false, error, payload: null},
  });
};

export const setPopularRequest = (state, {data}) => {
  return state.merge({
    ...state,
    setPopular: {...state.setPopular, fetching: true, data},
  });
};
export const setPopularSuccess = (state, {payload}) => {
  DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    setPopular: {fetching: false, error: null, payload, data: null},
    myPlaces: payload,
  });
};
export const setPopularFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    setPopular: {fetching: false, error, payload: null},
  });
};

export const setRecommendedRequest = (state, {data}) => {
  return state.merge({
    ...state,
    setRecommended: {...state.setRecommended, fetching: true, data},
  });
};
export const setRecommendedSuccess = (state, {payload}) => {
  DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    setRecommended: {fetching: false, error: null, payload, data: null},
    myPlaces: payload,
  });
};
export const setRecommendedFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    setRecommended: {fetching: false, error, payload: null},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REMOVE_MY_PLACES]: removeMyPlaces,

  [Types.GET_PLACES_REQUEST]: getPlacesRequest,
  [Types.GET_PLACES_SUCCESS]: getPlacesSuccess,
  [Types.GET_PLACES_FAILURE]: getPlacesFailure,

  [Types.GET_POPULAR_PLACES_REQUEST]: getPopularPlacesRequest,
  [Types.GET_POPULAR_PLACES_SUCCESS]: getPopularPlacesSuccess,
  [Types.GET_POPULAR_PLACES_FAILURE]: getPopularPlacesFailure,

  [Types.GET_RECOMMENDED_PLACES_REQUEST]: getRecommendedPlacesRequest,
  [Types.GET_RECOMMENDED_PLACES_SUCCESS]: getRecommendedPlacesSuccess,
  [Types.GET_RECOMMENDED_PLACES_FAILURE]: getRecommendedPlacesFailure,

  [Types.SAVE_PLACE_REQUEST]: savePlaceRequest,
  [Types.SAVE_PLACE_SUCCESS]: savePlaceSuccess,
  [Types.SAVE_PLACE_FAILURE]: savePlaceFailure,

  [Types.GET_USER_PLACES_REQUEST]: getUserPlacesRequest,
  [Types.GET_USER_PLACES_SUCCESS]: getUserPlacesSuccess,
  [Types.GET_USER_PLACES_FAILURE]: getUserPlacesFailure,

  [Types.SET_POPULAR_REQUEST]: setPopularRequest,
  [Types.SET_POPULAR_SUCCESS]: setPopularSuccess,
  [Types.SET_POPULAR_FAILURE]: setPopularFailure,

  [Types.SET_RECOMMENDED_REQUEST]: setRecommendedRequest,
  [Types.SET_RECOMMENDED_SUCCESS]: setRecommendedSuccess,
  [Types.SET_RECOMMENDED_FAILURE]: setRecommendedFailure,
});
