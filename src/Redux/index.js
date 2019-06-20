import { combineReducers } from 'redux';

const LoginRedux = require('./LoginRedux');
const TestReduxes = require('./TestRedux');

const allReducers = combineReducers({
  test: TestReduxes.reducer,
  user: LoginRedux.reducer
});

export default allReducers;
