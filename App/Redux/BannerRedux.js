/* eslint-disable curly */
import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

import {DropDownHolder} from '../Components/DropDownHolder';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getBannersRequest: ['data', 'callback'],
  getBannersSuccess: ['payload'],
  getBannersFailure: ['error'],

  addBannerRequest: ['data', 'callback'],
  addBannerSuccess: ['payload'],
  addBannerFailure: ['error'],

  deleteBannerRequest: ['data', 'callback'],
  deleteBannerSuccess: ['payload'],
  deleteBannerFailure: ['error'],

  removeBanners: null,
});

export const BannerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  banners: [],
  getBanners: DEFAULT_STATE,
  addBanner: DEFAULT_STATE,
  deleteBanner: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const removeBanners = state => {
  return state.merge({...state, banners: []});
};

export const getBannersRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getBanners: {...state.getBanners, fetching: true, data},
  });
};
export const getBannersSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getBanners: {fetching: false, error: null, payload, data: null},
    banners: payload,
  });
};
export const getBannersFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getBanners: {fetching: false, error, payload: null},
  });
};

export const addBannerRequest = (state, {data}) => {
  return state.merge({
    ...state,
    addBanner: {...state.addBanner, fetching: true, data},
  });
};
export const addBannerSuccess = (state, {payload}) => {
  DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    addBanner: {fetching: false, error: null, payload, data: null},
    banners: [...state.banners, payload],
  });
};
export const addBannerFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    addBanner: {fetching: false, error, payload: null},
  });
};

export const deleteBannerRequest = (state, {data}) => {
  return state.merge({
    ...state,
    deleteBanner: {...state.deleteBanner, fetching: true, data},
  });
};
export const deleteBannerSuccess = (state, {payload}) => {
  DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  let tempBanners = [...state.banners];
  const removedBannerIndex = tempBanners.findIndex(
    banner => banner.id === payload.id,
  );
  console.tron.log({tempBanners});
  console.tron.log({removedBannerIndex});
  if (removedBannerIndex > -1) {
    tempBanners.splice(removedBannerIndex, 1);
    console.tron.log({tempBanners});
  }

  return state.merge({
    ...state,
    deleteBanner: {fetching: false, error: null, payload, data: null},
    banners: tempBanners,
  });
};
export const deleteBannerFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    deleteBanner: {fetching: false, error, payload: null},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REMOVE_BANNERS]: removeBanners,

  [Types.GET_BANNERS_REQUEST]: getBannersRequest,
  [Types.GET_BANNERS_SUCCESS]: getBannersSuccess,
  [Types.GET_BANNERS_FAILURE]: getBannersFailure,

  [Types.ADD_BANNER_REQUEST]: addBannerRequest,
  [Types.ADD_BANNER_SUCCESS]: addBannerSuccess,
  [Types.ADD_BANNER_FAILURE]: addBannerFailure,

  [Types.DELETE_BANNER_REQUEST]: deleteBannerRequest,
  [Types.DELETE_BANNER_SUCCESS]: deleteBannerSuccess,
  [Types.DELETE_BANNER_FAILURE]: deleteBannerFailure,
});
