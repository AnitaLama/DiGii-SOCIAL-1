import { takeLatest, all } from 'redux-saga/effects';
import { TestTypes } from '../Redux/TestRedux';
import testFunction from './TestSaga';
import { LoginTypes } from '../Redux/LoginRedux';
import { PostTypes } from '../Redux/PostRedux';
import { PostTypeTypes } from '../Redux/PostTypeRedux';
import { onLoginRequest, onStudentLoginRequest } from './LoginSaga';
import { onListPosts, onPostSubmit } from './PostSaga';
import onListPostTypes from './PostTypeSaga';

export default function* root() {
  yield all([takeLatest(TestTypes.ON_TEST_REQUEST, testFunction)]);
  yield all([takeLatest(LoginTypes.ON_FORM_LOGIN_REQUEST, onLoginRequest)]);
  yield all([
    takeLatest(LoginTypes.ON_STUDENT_FORM_LOGIN_REQUEST, onStudentLoginRequest)
  ]);
  yield all([takeLatest(PostTypes.ON_LIST_POSTS, onListPosts)]);
  yield all([takeLatest(PostTypes.ON_POST_SUBMIT, onPostSubmit)]);
  yield all([takeLatest(PostTypeTypes.ON_LIST_POST_TYPES, onListPostTypes)]);
}
