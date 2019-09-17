import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import { DEV_URL } from '../utils/config';
import ReportActions from '../Redux/ReportRedux';

export default function* onReportTheArticle(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${DEV_URL}/report/reportAnArticle`,
      action.data
    );
    if (data.success) {
      yield put(ReportActions.onReportTheArticleSuccess(data.result));
    } else {
      yield put(ReportActions.onReportTheArticleFailure(data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
