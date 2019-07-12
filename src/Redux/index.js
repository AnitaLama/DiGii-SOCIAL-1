import { combineReducers } from 'redux';

const TestReduxes = require('./TestRedux');
const LoginRedux = require('./LoginRedux');
const PostRedux = require('./PostRedux');
const PostTypeRedux = require('./PostTypeRedux');
const CommentRedux = require('./CommentRedux');
const StrikeRedux = require('./StrikeRedux');
const PostActivityRedux = require('./PostActivityRedux');
const BannerRedux = require('./BannerRedux');
const ErrorRedux = require('./ErrorRedux');

const allReducers = combineReducers({
  test: TestReduxes.reducer,
  user: LoginRedux.reducer,
  post: PostRedux.reducer,
  postType: PostTypeRedux.reducer,
  postActivity: PostActivityRedux.reducer,
  strike: StrikeRedux.reducer,
  comment: CommentRedux.reducer,
  banner: BannerRedux.reducer,
  error: ErrorRedux.reducer
});

export default allReducers;
