import { combineReducers } from 'redux';

const TestReduxes = require('./TestRedux');

const allReducers = combineReducers({
  test: TestReduxes.reducer
});

export default allReducers;
