/* eslint-disable curly */
import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

import {DropDownHolder} from '../Components/DropDownHolder';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getRoomsRequest: ['data', 'callback'],
  getRoomsSuccess: ['payload'],
  getRoomsFailure: ['error'],

  getChatRequest: ['data', 'callback'],
  getChatSuccess: ['payload'],
  getChatFailure: ['error'],

  removeRooms: null,
});

export const ChatTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  rooms: [],
  messages: [],
  getRooms: DEFAULT_STATE,
  getChat: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const removeRooms = state => {
  return state.merge({...state, rooms: []});
};

export const getRoomsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getRooms: {...state.getRooms, fetching: true, data},
  });
};
export const getRoomsSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getRooms: {fetching: false, error: null, payload, data: null},
    rooms: payload,
  });
};
export const getRoomsFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getRooms: {fetching: false, error, payload: null},
  });
};

export const getChatRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getChat: {...state.getChat, fetching: true, data},
  });
};
export const getChatSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getChat: {fetching: false, error: null, payload, data: null},
    messages: payload,
  });
};
export const getChatFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getChat: {fetching: false, error, payload: null},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REMOVE_ROOMS]: removeRooms,

  [Types.GET_ROOMS_REQUEST]: getRoomsRequest,
  [Types.GET_ROOMS_SUCCESS]: getRoomsSuccess,
  [Types.GET_ROOMS_FAILURE]: getRoomsFailure,

  [Types.GET_CHAT_REQUEST]: getChatRequest,
  [Types.GET_CHAT_SUCCESS]: getChatSuccess,
  [Types.GET_CHAT_FAILURE]: getChatFailure,
});
