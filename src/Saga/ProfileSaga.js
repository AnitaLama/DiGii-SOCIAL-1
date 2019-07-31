import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import ProfileActions from '../Redux/ProfileRedux';

export function* onGetUserInfo(action) {
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

export function* onGetAvatarOfTheUser(action) {
  try {
    console.log('saga', action.data);
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/userProfile/getAvatarOfTheUser`,
      {
        avatarId: action.data
      }
    );
    console.log('saga output', data);
  } catch (err) {
    console.log(err.toString());
  }
}
