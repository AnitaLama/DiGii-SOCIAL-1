import { call } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';

export default function* testFunction() {
  try {
    const { data } = yield call(axios.get, `${DEV_URL}/school`);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
