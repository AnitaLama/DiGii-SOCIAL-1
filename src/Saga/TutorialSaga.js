import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../utils/config';
import TutorialActions from '../Redux/TutorialRedux';

export function* onTutorialRequest(action) {
  try {
    
    const { data } = yield call(axios.post, `${DEV_URL}/tutorial/get`, action.data);
    if (data.success) {
      yield put(TutorialActions.onTutorialRequestSuccess(data.result));
    } else {
      yield put(TutorialActions.onTutorialRequestFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onSaveTutorialWatchersInfo(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/tutorial/saveTutorialWatchersInfo`,
      action.data
    );
  } catch (err) {
    console.log(err);
  }
}
