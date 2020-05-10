import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  saveLoggedInUser: ['data'],
});

export const SessionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loggedInUser: undefined,
});

/* ------------- Reducers ------------- */

export const saveLoggedInUser = (state, {data}) => {
  return state.merge({...state, loggedInUser: data});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_LOGGED_IN_USER]: saveLoggedInUser,
});
