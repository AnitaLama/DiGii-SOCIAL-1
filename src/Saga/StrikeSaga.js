import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import StrikeActions from '../Redux/StrikeRedux';

export default function* onGetStrikesCountOfAUser(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/strikes/getUserStrikeCount`,
      action.data
    );
    console.log('data', data.result);
    if (data.success) {
      yield put(StrikeActions.onGetStrikesCountOfAUserSuccess(data.result));
    } else {
      yield put(StrikeActions.onGetStrikesCountOfAUserFailure(data.error));
    }
  } catch (err) {
    console.log(err);
    // yield put(StrikeActions.onGetStrikesCountOfAUserFailure(err.toString()));
  }
}
