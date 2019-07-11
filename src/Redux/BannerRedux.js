import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onGetAllBanners: []
});

export const BannerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false
});

/* ------------- Reducers ------------- */

export const test = (state, action) => {
  console.log('here', action);
  return { ...state, loading: !state.loading };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.ON_TEST_REQUEST]: test
});
