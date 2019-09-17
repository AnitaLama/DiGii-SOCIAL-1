import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../utils/config';
import HelperActions from '../Redux/HelperRedux';

const URL = `${DEV_URL}/help`;

export function* onGetAllInternalHelpers(action) {
  try {
    // console.log('saga input>>>', action.data);
    const { data } = yield call(
      axios.post,
      `${URL}/findHelpersFromSchool`,
      action.data
    );
    // console.log('saga >>>>', data);
    if (data.success) {
      yield put(HelperActions.onGetAllInternalHelpersSuccess(data.result));
    } else {
      yield put(HelperActions.onGetAllInternalHelpersFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onGetAllExternalHelpLines(action) {
  try {
    // console.log('saga input>>>', action.data);
    const { data } = yield call(
      axios.post,
      `${URL}/findExternalHelplines`,
      action.data
    );
    // console.log(data);
    if (data.success) {
      yield put(HelperActions.onGetAllExternalHelpLinesSuccess(data.result));
    } else {
      yield put(HelperActions.onGetAllExternalHelpLinesFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onSaveNeedHelp(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${URL}/saveNeedHelpInfo`,
      action.data
    );
    console.log('SAGA save need help info', data);
  } catch (err) {
    console.log(err);
  }
}

export function* onGetHelpNotificationsCount(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${URL}/onGetHelpNotificationsCount`,
      action.data
    );
    if (data.success) {
      yield put(HelperActions.onGetHelpNotificationsCountSuccess(data.result));
    } else {
      yield put(HelperActions.onGetHelpNotificationsCountFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
