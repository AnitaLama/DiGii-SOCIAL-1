import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import ProfileActions from '../Redux/ProfileRedux';

export default function* onGetUserInfo(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/user/getUser`,
      action.data
    );
    if (data.success) {
      yield put(ProfileActions.onGetUserInfoSuccess(data.result));
    }
  } catch (err) {
    console.log(err);
  }
}
