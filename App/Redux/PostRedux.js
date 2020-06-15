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

  commentRequest: ['data', 'callback'],
  commentSuccess: ['payload'],
  commentFailure: ['error'],

  getCommentsRequest: ['data', 'callback'],
  getCommentsSuccess: ['payload'],
  getCommentsFailure: ['error'],

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
  rootComments: {},
  comments: [],
  getPosts: DEFAULT_STATE,
  addPost: DEFAULT_STATE,
  likePost: DEFAULT_STATE,
  dislikePost: DEFAULT_STATE,
  comment: DEFAULT_STATE,
  getComments: DEFAULT_STATE,
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
  const {placeId, postId} = state.likePost.data;

  let tempPosts = [...state.rootPosts[placeId]];
  const postIndex = tempPosts.findIndex(post => post.id === postId);
  let post = {...tempPosts[postIndex]};

  let tempLikedBy = post.likedBy ? [...post.likedBy] : [];
  tempLikedBy.push(payload.userId);

  post.likedBy = tempLikedBy;
  tempPosts[postIndex] = post;

  return state.merge({
    ...state,
    likePost: {fetching: false, error: null, payload, data: null},
    rootPosts: {
      ...state.rootPosts,
      [placeId]: tempPosts,
    },
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
  const {placeId, postId} = state.dislikePost.data;

  let tempPosts = [...state.rootPosts[placeId]];
  const postIndex = tempPosts.findIndex(post => post.id === postId);
  let post = {...tempPosts[postIndex]};

  let tempDislikedBy = post.dislikedBy ? [...post.dislikedBy] : [];
  tempDislikedBy.push(payload.userId);

  post.dislikedBy = tempDislikedBy;
  tempPosts[postIndex] = post;

  return state.merge({
    ...state,
    dislikePost: {fetching: false, error: null, payload, data: null},
    rootPosts: {
      ...state.rootPosts,
      [placeId]: tempPosts,
    },
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

export const commentRequest = (state, {data}) => {
  return state.merge({
    ...state,
    comment: {...state.comment, fetching: true, data},
  });
};
export const commentSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);
  const {placeId, postId} = state.comment.data;

  let tempPosts = [...state.rootPosts[placeId]];
  // console.tron.log({tempPosts});
  const postIndex = tempPosts.findIndex(post => post.id === postId);
  let post = {...tempPosts[postIndex]};
  console.tron.log({post});

  let tempComments = post.comments ? [...post.comments] : [];
  tempComments.push(payload.id);
  console.tron.log({tempComments});

  post.comments = tempComments;
  tempPosts[postIndex] = post;
  console.tron.log({after: tempPosts});

  return state.merge({
    ...state,
    comment: {fetching: false, error: null, payload, data: null},
    rootPosts: {
      ...state.rootPosts,
      [placeId]: tempPosts,
    },
    rootComments: {
      ...state.rootComments,
      [postId]: [
        ...state.rootComments[postId],
        {...payload, updatedAt: new Date()},
      ],
    },
    // comments: [...state.comments, {...payload, updatedAt: new Date()}],
  });
};
export const commentFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    comment: {fetching: false, error, payload: null},
  });
};

export const getCommentsRequest = (state, {data}) => {
  return state.merge({
    ...state,
    getComments: {...state.getComments, fetching: true, data},
  });
};
export const getCommentsSuccess = (state, {payload}) => {
  // DropDownHolder.alert('success', I18n.t('successDefault'), undefined);

  return state.merge({
    ...state,
    getComments: {fetching: false, error: null, payload, data: null},
    rootComments: {
      ...state.rootComments,
      [state.getComments.data.postId]: payload.sort(
        (a, b) =>
          new Date(a.updatedAt._seconds * 1000) -
          new Date(b.updatedAt._seconds * 1000),
      ),
    },
    // comments: payload.sort(
    //   (a, b) =>
    //     new Date(a.updatedAt._seconds * 1000) -
    //     new Date(b.updatedAt._seconds * 1000),
    // ),
  });
};
export const getCommentsFailure = (state, {error}) => {
  DropDownHolder.alert(
    'error',
    I18n.t('errorDefault'),
    error.message || I18n.t('tryAgain'),
  );

  return state.merge({
    ...state,
    getComments: {fetching: false, error, payload: null},
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

  [Types.COMMENT_REQUEST]: commentRequest,
  [Types.COMMENT_SUCCESS]: commentSuccess,
  [Types.COMMENT_FAILURE]: commentFailure,

  [Types.GET_COMMENTS_REQUEST]: getCommentsRequest,
  [Types.GET_COMMENTS_SUCCESS]: getCommentsSuccess,
  [Types.GET_COMMENTS_FAILURE]: getCommentsFailure,
});
