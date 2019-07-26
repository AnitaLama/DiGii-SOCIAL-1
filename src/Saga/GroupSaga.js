import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import GroupActions from '../Redux/GroupRedux';

export default function* onGetAllUsersOfAGroup(action) {
  try {
    const { data } = yield call(axios.get, `${DEV_URL}/group/listAllUsers`);
    console.log('saga data', data);
    if (data.success) {
      yield put(GroupActions.onGetAllUsersOfAGroupSuccess(data.result));
    }
  } catch (err) {
    console.log(err);
  }
}