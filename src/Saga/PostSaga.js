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
      yield put(PostActions.onListPostsFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onFindPosts(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/post/find`,
      action.data
    );
    if (data.success) {
      yield put(PostActions.onFindPostsSuccess(data.result));
    } else {
      yield put(PostActions.onFindPostsFailure(data.error));
    }
    // if (data.success) {
    //   yield put(PostActions.onListPostsSuccess(data.result));
    // } else {
    //   yield put(PostActions.onListPostsFailure(data.message));
    // }
  } catch (err) {
    console.log(err);
    // yield put(PostActions.onListPostsFailure(err.toString()));
    // yield put(PostActions.onListPostsFailure(err.toString()));
  }
}

export function* onPostSubmit(action) {
  try {
    // console.log(action);
    const { data } = yield call(axios.post, `${URL}/addPost`, action.data);
    // console.log(data);
    // if (data.success) {
    //   yield put(PostActions.onListPosts());
    // }
  } catch (err) {
    console.log(err);
  }
}

export function* onFindGif(action) {
  try {
    const { data } = yield call(
      axios,
      `http://api.giphy.com/v1/gifs/search?q=${
        action.data
      }&api_key=dc6zaTOxFJmzC`
    );
    if (data) {
      yield put(PostActions.onFindGifSuccess(data.data));
    } else {
      yield put(PostActions.onFindGifFailure('Couldn\'t find gif'));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onPostImage(action) {
  try {
    const data = yield call(axios.post, `${URL}/upload`, action.data);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
