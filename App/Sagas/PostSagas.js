/* eslint-disable curly */
import {call, put, select} from 'redux-saga/effects';

import PostActions from '../Redux/PostRedux';

import {httpsCallable} from './Utils';
import {GET_POSTS, ADD_POST, LIKE_POST, DISLIKE_POST} from './Consts';

export function* getPosts(api, action) {
  try {
    const response = yield httpsCallable(GET_POSTS, action.data);

    console.tron.log({getPosts: response});

    if (response.data.ok) {
      yield put(PostActions.getPostsSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(PostActions.getPostsFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(PostActions.getPostsFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* addPost(api, action) {
  try {
    const response = yield httpsCallable(ADD_POST, action.data);

    console.tron.log({addPost: response});

    if (response.data.ok) {
      console.tron.log({addPost: response});
      yield put(PostActions.addPostSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(PostActions.addPostFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(PostActions.addPostFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* likePost(api, action) {
  try {
    const response = yield httpsCallable(LIKE_POST, action.data);

    console.tron.log({likePost: response});

    if (response.data.ok) {
      yield put(PostActions.likePostSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(PostActions.likePostFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(PostActions.likePostFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* dislikePost(api, action) {
  try {
    const response = yield httpsCallable(DISLIKE_POST, action.data);

    console.tron.log({dislikePost: response});

    if (response.data.ok) {
      yield put(PostActions.dislikePostSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(PostActions.dislikePostFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(PostActions.dislikePostFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}
