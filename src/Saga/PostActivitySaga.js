import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import PostActivityActions from '../Redux/PostActivityRedux';

export function* onGetPostActivitiesOfAUser(action) {
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

export function* onGetPostActivitiesReactionTypes(action) {
  try {
    const { data } = yield call(
      axios.get,
      `${DEV_URL}/postActivity/findActivityTypes`,
      action.data
    );
    if (data.success) {
      yield put(
        PostActivityActions.onGetPostActivitiesReactionTypesSuccess(data.result)
      );
    } else {
      yield put(
        PostActivityActions.onGetPostActivitiesReactionTypesFail(data.error)
      );
    }
  } catch (err) {
    console.log(err);
  }
}

export function* onSelectReaction(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/post/addLikeCount`,
      action.data
    );
  } catch (err) {
    console.log(err);
  }
}
