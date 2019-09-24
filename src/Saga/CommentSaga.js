import { call } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../utils/config';

const URL = `${DEV_URL}/comment`;

export function* onSubmitComment(action) {
  try {
    console.log('saga', action.data);
    const { data } = yield call(axios.post, `${URL}/addComment`, action.data);
  } catch (err) {
    console.log(err);
  }
}

export function* onCommentDelete(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${URL}/onCommentDelete`,
      action.data
    );
  } catch (err) {
    console.log(err);
  }
}
