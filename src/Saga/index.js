import { takeLatest, all } from 'redux-saga/effects';
import { TestTypes } from '../Redux/TestRedux';
import testFunction from './TestSaga';
import { LoginTypes } from '../Redux/LoginRedux';
import onLoginRequest from './LoginSaga';

export default function* root() {
  yield all([takeLatest(LoginTypes.ON_FORM_LOGIN_REQUEST, onLoginRequest)]);
  yield all([takeLatest(TestTypes.ON_TEST_REQUEST, testFunction)]);
}
