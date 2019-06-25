import { combineReducers } from 'redux';

const TestReduxes = require('./TestRedux');
const LoginRedux = require('./LoginRedux');
const PostRedux = require('./PostRedux');

const allReducers = combineReducers({
  test: TestReduxes.reducer,
  user: LoginRedux.reducer,
  post: PostRedux.reducer
});

export default allReducers;
