import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import PostTypeRedux from '../Redux/PostTypeRedux';

const URL = `${DEV_URL}/postType`;

export default function* onListPostTypes() {
  try {
    const { data } = yield call(axios, `${URL}`);
    if (data.success) {
      yield put(PostTypeRedux.onListPostTypesSuccess(data.result));
    } else {
      yield put(PostTypeRedux.onListPostTypesFailure(data.error));
    }
  } catch (err) {
    yield put(PostTypeRedux.onListPostTypesFailure(err.toString()));
  }
}
