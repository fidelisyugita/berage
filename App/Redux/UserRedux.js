/* eslint-disable curly */
import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

import {DropDownHolder} from '../Components/DropDownHolder';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  saveUserRequest: ['data', 'callback'],
  saveUserSuccess: ['payload'],
  saveUserFailure: ['error'],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  saveUser: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const saveUserRequest = (state, {data}) => {
  return state.merge({
    ...state,
    saveUser: {...state.saveUser, fetching: true, data},
  });
};
export const saveUserSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    saveUser: {fetching: false, error: null, payload, data: null},
  });
};
export const saveUserFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    saveUser: {fetching: false, error, payload: null},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_USER_REQUEST]: saveUserRequest,
  [Types.SAVE_USER_SUCCESS]: saveUserSuccess,
  [Types.SAVE_USER_FAILURE]: saveUserFailure,
});
