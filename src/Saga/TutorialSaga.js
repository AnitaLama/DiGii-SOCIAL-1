import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import TutorialActions from '../Redux/TutorialRedux';

export default function* onTutorialRequest(action) {
  try {
    console.log('saga input', action);
    const { data } = yield call(axios.post, `${DEV_URL}/tutorial`, {
      type: action.data
    });
    console.log('saga tutorial output', data);
    if (data.success) {
      yield put(TutorialActions.onTutorialRequestSuccess(data.result));
    } else {
      console.log('saga data failure', data);
      yield put(TutorialActions.onTutorialRequestFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
