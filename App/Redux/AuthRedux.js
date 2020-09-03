import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

import {DropDownHolder} from '../Components/DropDownHolder';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  loginWithGoogleRequest: ['data', 'callback'],
  loginWithGoogleSuccess: ['payload'],
  loginWithGoogleFailure: ['error'],

  loginWithAppleRequest: ['data', 'callback'],
  loginWithAppleSuccess: ['payload'],
  loginWithAppleFailure: ['error'],

  logoutRequest: ['data'],
  logoutSuccess: ['payload'],
  logoutFailure: ['error'],
});

export const AuthTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  login: DEFAULT_STATE,
  logout: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const loginWithGoogleRequest = (state, {data}) => {
  return state.merge({...state, login: {fetching: true, data}});
};
export const loginWithGoogleSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    login: {fetching: false, error: null, payload, data: null},
  });
};
export const loginWithGoogleFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    login: {fetching: false, error, payload: null},
  });
};

export const loginWithAppleRequest = (state, {data}) => {
  return state.merge({...state, login: {fetching: true, data}});
};
export const loginWithAppleSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    login: {fetching: false, error: null, payload, data: null},
  });
};
export const loginWithAppleFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    login: {fetching: false, error, payload: null},
  });
};

export const logoutRequest = (state, {data}) => {
  return state.merge({...state, logout: {fetching: true, data}});
};
export const logoutSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    logout: {fetching: false, error: null, payload, data: null},
  });
};
export const logoutFailure = (state, {error}) => {
  return state.merge({
    ...state,
    logout: {fetching: false, error, payload: null},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_WITH_GOOGLE_REQUEST]: loginWithGoogleRequest,
  [Types.LOGIN_WITH_GOOGLE_SUCCESS]: loginWithGoogleSuccess,
  [Types.LOGIN_WITH_GOOGLE_FAILURE]: loginWithGoogleFailure,

  [Types.LOGIN_WITH_APPLE_REQUEST]: loginWithAppleRequest,
  [Types.LOGIN_WITH_APPLE_SUCCESS]: loginWithAppleSuccess,
  [Types.LOGIN_WITH_APPLE_FAILURE]: loginWithAppleFailure,

  [Types.LOGOUT_REQUEST]: logoutRequest,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGOUT_FAILURE]: logoutFailure,
});
