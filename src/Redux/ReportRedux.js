import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onReportTheArticle: ['data'],
  onReportTheArticleSuccess: ['data'],
  onReportTheArticleFailure: ['data'],
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

const onReportTheArticleSuccess = state => ({
  ...state,
  loading: false,
  enableNotification: true
});

const onReportTheArticleFailure = state => ({
  ...state,
  loading: false,
  enableNotification: false
});

const disableTheReportNotification = state => ({
  ...state,
  enableNotification: false
});
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_REPORT_THE_ARTICLE_SUCCESS]: onReportTheArticleSuccess,
  [Types.ON_REPORT_THE_ARTICLE_FAILURE]: onReportTheArticleFailure,
  [Types.DISABLE_THE_REPORT_NOTIFICATION]: disableTheReportNotification
});
