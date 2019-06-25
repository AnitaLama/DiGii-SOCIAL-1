import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import LoginActions from '../Redux/LoginRedux';
import history from '../history';
import { DEV_URL } from '../config';

export default function* onLoginRequest(action) {
  try {
    const { data } = yield call(axios.post, `${DEV_URL}/login`, action.data);
    if (data.success) {
      history.push('/messageboard');
      yield put(LoginActions.onFormLoginSuccess(data.result));
    } else {
      yield put(LoginActions.onFormLoginFailure(data.message));
    }
  } catch (err) {
    console.log(err);
  }
}
