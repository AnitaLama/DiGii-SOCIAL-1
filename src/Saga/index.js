import { takeLatest, all } from 'redux-saga/effects';
import { TestTypes } from '../Redux/TestRedux';
import testFunction from './TestSaga';
import { LoginTypes } from '../Redux/LoginRedux';
import { PostTypes } from '../Redux/PostRedux';
import onLoginRequest from './LoginSaga';
import onListPosts from './PostSaga';

export default function* root() {
  yield all([takeLatest(TestTypes.ON_TEST_REQUEST, testFunction)]);
  yield all([takeLatest(LoginTypes.ON_FORM_LOGIN_REQUEST, onLoginRequest)]);
  yield all([takeLatest(PostTypes.ON_LIST_POSTS, onListPosts)]);
}
