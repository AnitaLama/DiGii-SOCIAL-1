import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import BannerActions from '../Redux/BannerRedux';

export default function* onGetAllBanners() {
  try {
    const { data } = yield call(axios.get, `${DEV_URL}/banner`);
    console.log(data);
    if (data.success) {
      yield put(BannerActions.onGetAllBannersSuccess(data.result));
    } else {
      yield put(BannerActions.onGetAllBannersFailure(data.message));
    }
  } catch (err) {
    console.log(err);
  }
}
