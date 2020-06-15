/* eslint-disable curly */
import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

import {DropDownHolder} from '../Components/DropDownHolder';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getInboxesRequest: ['data', 'callback'],
  getInboxesSuccess: ['payload'],
  getInboxesFailure: ['error'],

  sendNotifRequest: ['data', 'callback'],
  sendNotifSuccess: ['payload'],
  sendNotifFailure: ['error'],

  removeInboxes: null,
});

export const InboxTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  inboxes: [],
  getInboxes: DEFAULT_STATE,
  sendNotif: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const removeInboxes = state => {
  return state.merge({...state, inboxes: []});
};

export const getInboxesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getInboxes: {...state.getInboxes, fetching: true, data},
  });
};
export const getInboxesSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getInboxes: {fetching: false, error: null, payload, data: null},
    inboxes: payload,
  });
};
export const getInboxesFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getInboxes: {fetching: false, error, payload: null},
  });
};

export const sendNotifRequest = (state, {data}) => {
  return state.merge({
    ...state,
    sendNotif: {...state.sendNotif, fetching: true, data},
  });
};
export const sendNotifSuccess = (state, {payload}) => {
  DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    sendNotif: {fetching: false, error: null, payload, data: null},
  });
};
export const sendNotifFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    sendNotif: {fetching: false, error, payload: null},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REMOVE_INBOXES]: removeInboxes,

  [Types.GET_INBOXES_REQUEST]: getInboxesRequest,
  [Types.GET_INBOXES_SUCCESS]: getInboxesSuccess,
  [Types.GET_INBOXES_FAILURE]: getInboxesFailure,

  [Types.SEND_NOTIF_REQUEST]: sendNotifRequest,
  [Types.SEND_NOTIF_SUCCESS]: sendNotifSuccess,
  [Types.SEND_NOTIF_FAILURE]: sendNotifFailure,
});
