import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onTestRequest: []
});

export const OptionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false
});

/* ------------- Reducers ------------- */

const test = (state, action) => {
  console.log('here', action);
  return { ...state, loading: false };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_TEST_REQUEST]: test
});
