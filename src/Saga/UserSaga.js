import { call } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';

export default function* onGetUserInfo(action) {
  try {
    const { data } = yield call(axios.post, `${DEV_URL}/user`, action.data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
