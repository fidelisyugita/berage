import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  saveUser: ['data'],
  logout: null,
  saveUserLocation: ['data'],

  setFavoriteIds: ['data'],
  addFavoriteId: ['data'],
  removeFavoriteId: ['data'],

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

export const logout = state => {
  return state.merge({...INITIAL_STATE});
};

export const saveUserLocation = (state, {data}) => {
  console.tron.log({saveUserLocation: data});
  return state.merge({...state, userLocation: data});
};

export const setFavoriteIds = (state, {data}) => {
  console.tron.log({setFavoriteIds: data});
  return state.merge({
    ...state,
    favoriteIds: data.map(fav => fav.id),
  });
};

export const addFavoriteId = (state, {data}) => {
  console.tron.log({addFavoriteId: data});
  return state.merge({
    ...state,
    favoriteIds: [...state.favoriteIds, data.placeId],
  });
};

export const removeFavoriteId = (state, {data}) => {
  console.tron.log({removeFavoriteId: data});
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
  [Types.LOGOUT]: logout,
  [Types.SAVE_USER_LOCATION]: saveUserLocation,
  [Types.SET_FAVORITE_IDS]: setFavoriteIds,
  [Types.ADD_FAVORITE_ID]: addFavoriteId,
  [Types.REMOVE_FAVORITE_ID]: removeFavoriteId,
});
