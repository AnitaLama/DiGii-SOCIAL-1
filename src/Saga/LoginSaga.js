import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import LoginActions from '../Redux/LoginRedux';
import ErrorActions from '../Redux/ErrorRedux';
import history from '../history';
import { DEV_URL } from '../config';

export function* onLoginRequest(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/verifyUser`,
      action.data
    );
    console.log('login saga', data);
    if (data.success) {
      yield put(LoginActions.onFormLoginSuccess(data.result));
      yield localStorage.setItem('user', JSON.stringify(data.result));
      history.push('/messageboard');
    } else {
      yield put(ErrorActions.onFormLoginFailure(data.error));
    }
  } catch (err) {
    yield put(ErrorActions.onFormLoginFailure(err.toString()));
    console.log(err);
    // yield put(LoginActions.onFormLoginFailure(err.toString()));
  }
}

export function* onStudentLoginRequest(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/student/verifyStudent`,
      action.data
    );

    if (data.success) {
      yield put(LoginActions.onStudentFormLoginSuccess(data.result));
      yield localStorage.setItem('user', JSON.stringify(data.result));
      history.push('/messageboard');
    } else {
      yield put(ErrorActions.onStudentFormLoginFailure(data.error));
    }
  } catch (err) {
    yield put(ErrorActions.onStudentFormLoginFailure(err.toString()));
    console.log(err);
    // yield put(LoginActions.onStudentFormLoginFailure(err.toString()));
  }
}

export function* onBlockUser(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/deactivateUser`,
      action.data
    );
    if (data.success) {
      alert('You\'ve been striked out.');
      yield localStorage.removeItem('user');
      history.push('/student/login');
    }
  } catch (err) {
    console.log(err);
  }
}
