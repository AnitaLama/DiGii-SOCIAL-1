import { call } from 'redux-saga/effects';
import axios from 'axios';

export default function* testFunction(action) {
  try {
    yield console.log('saga function called', action);
    const data = yield call(axios.get, 'http://localhost:4000/user');
    console.log('saga data', data);
  } catch (err) {
    console.log(err);
  }
}
