import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import SchoolActions from '../Redux/SchoolRedux';

export default function* onGetAllSchools() {
  try {
    const { data } = yield call(axios.get, `${DEV_URL}/school`);
    console.log(data);
    if (data.success) {
      yield put(SchoolActions.onGetAllSchoolsSuccess(data.result));
    } else {
      yield put(SchoolActions.onGetAllSchoolsFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
