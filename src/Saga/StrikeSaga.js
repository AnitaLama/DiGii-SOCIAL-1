import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../utils/config';
import StrikeActions from '../Redux/StrikeRedux';

export function* onGetStrikesCountOfAUser(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/strikes/getUserStrikeCount`,
      action.data
    );
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

export function* resetStrikeOfTheUserRequest(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/strikes/updateUserStrikes`,
      action.data
    );
    // console.log('reset strikes saga output', data);
  } catch (err) {
    console.log(err);
  }
}
