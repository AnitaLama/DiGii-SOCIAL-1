import { combineReducers } from 'redux';

const allReducers = combineReducers({
  test: require('./TestRedux').reducer
});

export default allReducers;
