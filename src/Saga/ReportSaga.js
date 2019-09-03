import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../config';
import ReportActions from '../Redux/ReportRedux';

export default function* onReportAnArticle(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/report/reportAnArticle`,
      action.data
    );
    if (data.success) {
      yield put(ReportActions.onReportAnArticleSuccess(data.result));
    } else {
      yield put(ReportActions.onReportAnArticleFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
