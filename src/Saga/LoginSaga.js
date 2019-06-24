import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import LoginActions from '../Redux/LoginRedux';
import history from '../history';

export default function* onLoginRequest(action) {
  try {
    const { data } = yield call(
      axios.post,
      'http://localhost:4000/login',
      action.data
    );
    console.log(data);
    if (data.success) {
      yield put(LoginActions.onFormLoginSuccess(data.result));
      history.push('/messageboard');
    } else {
      yield put(LoginActions.onFormLoginFailure(data.message));
    }
  } catch (err) {
    console.log(err);
  }
}
