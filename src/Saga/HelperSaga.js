import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import HelperActions from '../Redux/HelperRedux';

const URL = `${DEV_URL}/help`;
export default function* onGetAllInternalHelpers(action) {
  try {
    console.log('saga input>>>', action.data);
    const { data } = yield call(axios.post, `${URL}/findHelpers`, action.data);
    if (data.success) {
      yield put(HelperActions.onGetAllInternalHelpersSuccess(data.result));
    } else {
      yield put(HelperActions.onGetAllInternalHelpersFailure(data.error));
    }
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
