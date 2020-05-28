/* eslint-disable curly */
import {call, put} from 'redux-saga/effects';

import InboxActions from '../Redux/InboxRedux';

import {httpsCallable} from './Utils';
import {GET_INBOXES, SEND_NOTIF} from './Consts';

export function* getInboxes(api, action) {
  try {
    const response = yield httpsCallable(GET_INBOXES, action.data);

    console.tron.log({getInboxes: response});

    if (response.data.ok) {
      yield put(InboxActions.getInboxesSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(InboxActions.getInboxesFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(InboxActions.getInboxesFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}

export function* sendNotif(api, action) {
  try {
    const response = yield httpsCallable(SEND_NOTIF, action.data);

    console.tron.log({sendNotif: response});

    if (response.data.ok) {
      yield put(InboxActions.sendNotifSuccess(response.data.payload));
      if (action.callback) action.callback({ok: true});
    } else {
      yield put(InboxActions.sendNotifFailure(response.data.error));
      if (action.callback) action.callback({ok: false});
    }
  } catch (error) {
    yield put(InboxActions.sendNotifFailure(error));
    if (action.callback) action.callback({ok: false});
  }
}
