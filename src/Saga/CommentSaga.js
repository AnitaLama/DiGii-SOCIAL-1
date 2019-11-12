import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../utils/config';
import CommentActions from '../Redux/CommentRedux';

const URL = `${DEV_URL}/comment`;
export function* onSubmitComment(action) {
  try {
    console.log('saga', action.data);
    const { data } = yield call(axios.post, `${URL}/addComment`, action.data);
    console.log('saga output', data);
    if (data.success) {
      yield put(CommentActions.onSubmitCommentSuccess(data.result));
    } else {
      yield put(CommentActions.onSubmitCommentFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onCommentDelete(action) {
  try {
    console.log(action.data);
    const { data } = yield call(
      axios.post,
      `${URL}/onCommentDelete`,
      action.data
    );
    console.log('saga output', data);
  } catch (err) {
    console.log(err);
  }
}

export function* onReactToAComment(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${URL}/add/comment/reaction`,
      action.data
    );
    console.log('saga comment data', data);
  } catch (err) {
    console.log(err);
  }
}
