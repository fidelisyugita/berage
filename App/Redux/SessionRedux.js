import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  saveUser: ['data'],
  removeUser: null,
  saveUserLocation: ['data'],
  setFavorite: ['data'],
  addFavorite: ['data'],
  removeFavorite: ['data'],
  // removeOnboarding: null,
  // changeLanguage: ['data'],
});

export const SessionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  user: null,
  userLocation: null,
  favoriteIds: [],
  // language: 'en',
});

/* ------------- Selectors ------------- */

export const SessionSelectors = {
  getUser: state => state.session.user,
};

/* ------------- Reducers ------------- */

export const saveUser = (state, {data}) => {
  return state.merge({...state, user: data, favoriteIds: data.favorites || []});
};

export const removeUser = state => {
  return state.merge({...state, user: null, favoriteIds: []});
};

export const saveUserLocation = (state, {data}) => {
  console.tron.log({saveUserLocation: data});
  return state.merge({...state, userLocation: data});
};

export const setFavorite = (state, {data}) => {
  console.tron.log({setFavorite: data});
  return state.merge({
    ...state,
    favoriteIds: data.map(fav => fav.id),
  });
};

export const addFavorite = (state, {data}) => {
  console.tron.log({addFavorite: data});
  return state.merge({
    ...state,
    favoriteIds: [...state.favoriteIds, data.placeId],
  });
};

export const removeFavorite = (state, {data}) => {
  console.tron.log({removeFavorite: data});
  let tempIds = [...state.favoriteIds];
  const removedIndex = tempIds.indexOf(data.placeId);
  console.tron.log({tempIds});
  console.tron.log({removedIndex});
  if (removedIndex > -1) {
    tempIds.splice(removedIndex, 1);
    console.tron.log({tempIds});
  }
  return state.merge({...state, favoriteIds: tempIds});
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_USER]: saveUser,
  [Types.REMOVE_USER]: removeUser,
  [Types.SAVE_USER_LOCATION]: saveUserLocation,
  [Types.SET_FAVORITE]: setFavorite,
  [Types.ADD_FAVORITE]: addFavorite,
  [Types.REMOVE_FAVORITE]: removeFavorite,
});
