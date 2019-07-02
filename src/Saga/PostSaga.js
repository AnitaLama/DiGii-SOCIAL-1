import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import PostActions from '../Redux/PostRedux';

const URL = `${DEV_URL}/post`;

export function* onListPosts() {
  try {
    const { data } = yield call(axios.get, `${URL}`);
    if (data.success) {
      yield put(PostActions.onListPostsSuccess(data.result));
    } else {
      yield put(PostActions.onListPostsFailure(data.message));
    }
  } catch (err) {
    console.log(err);
    // yield put(PostActions.onListPostsFailure(err.toString()));
    // yield put(PostActions.onListPostsFailure(err.toString()));
  }
}

export function* onPostSubmit(action) {
  try {
    const { data } = yield call(axios.post, `${URL}/addPost`, action.data);
    if (data.success) {
      yield put(PostActions.onListPosts());
    }
  } catch (err) {
    console.log(err);
  }
}
