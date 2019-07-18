import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import PostActivityActions from '../Redux/PostActivityRedux';

export default function* onGetPostActivitiesOfAUser(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/postActivity/findUserActivities`,
      action.data
    );
    if (data.success) {
      yield put(
        PostActivityActions.onGetPostActivitiesOfAUserSuccess(data.result)
      );
    } else {
      yield put(
        PostActivityActions.onGetPostActivitiesOfAUserFailure(data.error)
      );
    }
  } catch (err) {
    console.log(err);
  }
}
