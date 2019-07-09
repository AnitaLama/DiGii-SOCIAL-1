import { call } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';

export default function* onSubmitComment(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/comment/addComment`,
      action.data
    );
  } catch (err) {
    console.log(err);
  }
}
