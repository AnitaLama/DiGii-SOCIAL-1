import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onReportAnArticle: ['data'],
  onReportAnArticleSuccess: ['data'],
  onReportAnArticleFailure: ['data'],
  disableTheReportNotification: []
});

export const ReportTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  enableNotification: false
});

/* ------------- Reducers ------------- */
const onReportAnArticleSuccess = (state, action) => {
  console.log('here', action.data);
  return { ...state, enableNotification: true };
};

const onReportAnArticleFailure = (state, action) => {
  console.log('here', action.data);
  return { ...state, enableNotification: false };
};

const disableTheReportNotification = state => ({
  ...state,
  enableNotification: false
});
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_REPORT_AN_ARTICLE_SUCCESS]: onReportAnArticleSuccess,
  [Types.ON_REPORT_AN_ARTICLE_FAILURE]: onReportAnArticleFailure,
  [Types.DISABLE_THE_REPORT_NOTIFICATION]: disableTheReportNotification
});
