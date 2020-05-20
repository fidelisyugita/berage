import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  saveUser: ['data'],
  removeUser: null,
  saveUserLocation: ['data'],
  // removeOnboarding: null,
  // changeLanguage: ['data'],
});

export const SessionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  userLocation: null,
  language: 'en',
});

/* ------------- Selectors ------------- */

export const SessionSelectors = {
  selectUser: state => state.session.user,
};

/* ------------- Reducers ------------- */

export const saveUser = (state, {data}) => {
  return state.merge({...state, user: data});
};

export const removeUser = state => {
  return state.merge({...state, user: null});
};

export const saveUserLocation = (state, {data}) => {
  console.tron.log({data});
  return state.merge({...state, userLocation: data});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_USER]: saveUser,
  [Types.REMOVE_USER]: removeUser,
  [Types.SAVE_USER_LOCATION]: saveUserLocation,
});
