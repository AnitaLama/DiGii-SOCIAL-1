import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import LoginActions from '../Redux/LoginRedux';
import history from '../history';
import { DEV_URL } from '../config';

export function* onLoginRequest(action) {
  try {
    const { data } = yield call(axios.post, `${DEV_URL}/login`, action.data);
    if (data.success) {
      history.push('/messageboard');
      yield put(LoginActions.onFormLoginSuccess(data.result));
    } else {
      yield put(LoginActions.onFormLoginFailure(data.error));
    }
  } catch (err) {
    console.log(err);
    yield put(LoginActions.onFormLoginFailure(err.toString()));
  }
}

export function* onStudentLoginRequest(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/student/login`,
      action.data
    );
    if (data.success) {
      history.push('/messageboard');
      yield put(LoginActions.onStudentFormLoginSuccess(data.result));
    } else {
      yield put(LoginActions.onStudentFormLoginFailure(data.error));
    }
  } catch (err) {
    console.log(err);
    yield put(LoginActions.onStudentFormLoginFailure(err.toString()));
  }
}
