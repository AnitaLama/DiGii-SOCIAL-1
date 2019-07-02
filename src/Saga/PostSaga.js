import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import PostRedux from '../Redux/PostRedux';

const URL = `${DEV_URL}/post`;

export function* onListPosts() {
  try {
    const { data } = yield call(axios.get, `${URL}`);
    if (data.success) {
      yield put(PostRedux.onListPostsSuccess(data.result));
    } else {
      yield put(PostRedux.onListPostsFailure(data.message));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onPostSubmit(action) {
  try {
    const { data } = yield call(axios.post, `${URL}/addPost`, action.data);
    if (data.success) {
      yield put(PostRedux.onListPosts());
    }
  } catch (err) {
    console.log(err);
  }
}
