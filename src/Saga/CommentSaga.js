import { call } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../utils/config';

export default function* onSubmitComment(action) {
  try {
    console.log('saga', action.data);
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/comment/addComment`,
      action.data
    );
  } catch (err) {
    console.log(err);
  }
}
