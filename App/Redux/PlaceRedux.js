import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getPopularPlacesRequest: ['data', 'callback'],
  getPopularPlacesSuccess: ['payload'],
  getPopularPlacesFailure: ['error'],
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
});

/* ------------- Reducers ------------- */

export const getPopularPlacesRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getPopularPlaces: {...state.getPopularPlaces, fetching: true, data},
  });
};
export const getPopularPlacesSuccess = (state, {payload}) => {
  return state.merge({
    ...state,
    getPopularPlaces: {fetching: false, error: null, payload, data: null},
  });
};
export const getPopularPlacesFailure = (state, {error}) => {
  return state.merge({
    ...state,
    getPopularPlaces: {fetching: false, error, payload: null},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_POPULAR_PLACES_REQUEST]: getPopularPlacesRequest,
  [Types.GET_POPULAR_PLACES_SUCCESS]: getPopularPlacesSuccess,
  [Types.GET_POPULAR_PLACES_FAILURE]: getPopularPlacesFailure,
});
