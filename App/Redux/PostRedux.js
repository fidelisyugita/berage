/* eslint-disable curly */
import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

import I18n from '../I18n';

import {DropDownHolder} from '../Components/DropDownHolder';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  getPostsRequest: ['data', 'callback'],
  getPostsSuccess: ['payload'],
  getPostsFailure: ['error'],

  addPostRequest: ['data', 'callback'],
  addPostSuccess: ['payload'],
  addPostFailure: ['error'],

  likePostRequest: ['data', 'callback'],
  likePostSuccess: ['payload'],
  likePostFailure: ['error'],

  dislikePostRequest: ['data', 'callback'],
  dislikePostSuccess: ['payload'],
  dislikePostFailure: ['error'],

  removePosts: null,
});

export const PostTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const DEFAULT_STATE = {
  data: null,
  fetching: false,
  payload: null,
  error: null,
};

export const INITIAL_STATE = Immutable({
  rootPosts: {},
  getPosts: DEFAULT_STATE,
  addPost: DEFAULT_STATE,
  likePost: DEFAULT_STATE,
  dislikePost: DEFAULT_STATE,
});

/* ------------- Reducers ------------- */

export const removePosts = state => {
  return state.merge({...state, rootPosts: {}});
};

export const getPostsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getPosts: {...state.getPosts, fetching: true, data},
  });
};
export const getPostsSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getPosts: {fetching: false, error: null, payload, data: null},
    rootPosts: {
      ...state.rootPosts,
      [state.getPosts.data.placeId]: payload,
    },
  });
};
export const getPostsFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getPosts: {fetching: false, error, payload: null},
  });
};

export const addPostRequest = (state, {data}) => {
  return state.merge({
    ...state,
    addPost: {...state.addPost, fetching: true, data},
  });
};
export const addPostSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  console.tron.log({'state.rootPosts': state.rootPosts});
  let tempPosts = [];
  if (state.rootPosts && state.rootPosts !== {})
    tempPosts = [...state.rootPosts[state.addPost.data.placeId]];
  tempPosts.splice(0, 0, {...payload, updatedAt: new Date()});
  console.tron.log({tempPosts});

  return state.merge({
    ...state,
    addPost: {fetching: false, error: null, payload, data: null},
    rootPosts: {
      ...state.rootPosts,
      [state.addPost.data.placeId]: tempPosts,
    },
  });
};
export const addPostFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    addPost: {fetching: false, error, payload: null},
  });
};

export const likePostRequest = (state, {data}) => {
  return state.merge({
    ...state,
    likePost: {...state.likePost, fetching: true, data},
  });
};
export const likePostSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    likePost: {fetching: false, error: null, payload, data: null},
  });
};
export const likePostFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    likePost: {fetching: false, error, payload: null},
  });
};

export const dislikePostRequest = (state, {data}) => {
  return state.merge({
    ...state,
    dislikePost: {...state.dislikePost, fetching: true, data},
  });
};
export const dislikePostSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    dislikePost: {fetching: false, error: null, payload, data: null},
    myPlaces: payload,
  });
};
export const dislikePostFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    dislikePost: {fetching: false, error, payload: null},
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REMOVE_POSTS]: removePosts,

  [Types.GET_POSTS_REQUEST]: getPostsRequest,
  [Types.GET_POSTS_SUCCESS]: getPostsSuccess,
  [Types.GET_POSTS_FAILURE]: getPostsFailure,

  [Types.ADD_POST_REQUEST]: addPostRequest,
  [Types.ADD_POST_SUCCESS]: addPostSuccess,
  [Types.ADD_POST_FAILURE]: addPostFailure,

  [Types.LIKE_POST_REQUEST]: likePostRequest,
  [Types.LIKE_POST_SUCCESS]: likePostSuccess,
  [Types.LIKE_POST_FAILURE]: likePostFailure,

  [Types.DISLIKE_POST_REQUEST]: dislikePostRequest,
  [Types.DISLIKE_POST_SUCCESS]: dislikePostSuccess,
  [Types.DISLIKE_POST_FAILURE]: dislikePostFailure,
});
