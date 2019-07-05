import { combineReducers } from 'redux';

const TestReduxes = require('./TestRedux');
const LoginRedux = require('./LoginRedux');
const PostRedux = require('./PostRedux');
const PostTypeRedux = require('./PostTypeRedux');
const CommentRedux = require('./CommentRedux');
const PostActivityRedux = require('./PostActivityRedux');

const allReducers = combineReducers({
  test: TestReduxes.reducer,
  user: LoginRedux.reducer,
  post: PostRedux.reducer,
  postType: PostTypeRedux.reducer,
  postActivity: PostActivityRedux.reducer,
  comment: CommentRedux.reducer
});

export default allReducers;
