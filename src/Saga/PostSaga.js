import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import PostRedux from '../Redux/PostRedux';

export default function* onListPosts(action) {
  try {
    const { data } = yield call(axios.get, `${DEV_URL}/post`);
    if (data.success) {
      yield put(PostRedux.onListPostsSuccess(data.result));
    } else {
      yield put(PostRedux.onListPostsFailure(data.message));
    }
  } catch (err) {
    console.log(err);
  }
}
