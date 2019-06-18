import { combineReducers } from 'redux';

const LoginRedux = require('./LoginRedux');
const TestReduxes = require('./TestRedux');

const allReducers = combineReducers({
  test: TestReduxes.reducer,
  login: LoginRedux.reducer
});

export default allReducers;
