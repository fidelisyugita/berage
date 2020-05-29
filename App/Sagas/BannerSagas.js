/* eslint-disable curly */
import {call, put} from 'redux-saga/effects';

import BannerActions from '../Redux/BannerRedux';

import {httpsCallable} from './Utils';
import {GET_BANNERS, ADD_BANNER, DELETE_BANNER} from './Consts';

export function* getBanners(api, action) {
  try {
    const response = yield httpsCallable(GET_BANNERS, action.data);

    console.tron.log({getBanners: response});

    if (response.data.ok) {
      yield put(BannerActions.getBannersSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(BannerActions.getBannersFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(BannerActions.getBannersFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* addBanner(api, action) {
  try {
    const response = yield httpsCallable(ADD_BANNER, action.data);

    console.tron.log({addBanner: response});

    if (response.data.ok) {
      yield put(BannerActions.addBannerSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(BannerActions.addBannerFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(BannerActions.addBannerFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* deleteBanner(api, action) {
  try {
    const response = yield httpsCallable(DELETE_BANNER, action.data);

    console.tron.log({deleteBanner: response});

    if (response.data.ok) {
      yield put(BannerActions.deleteBannerSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(BannerActions.deleteBannerFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(BannerActions.deleteBannerFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}
