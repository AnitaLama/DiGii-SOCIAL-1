import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onGetAllBanners: [],
  onGetAllBannersSuccess: ['data'],
  onGetAllBannersFailure: ['data']
});

export const BannerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  banners: [],
  error: null
});

/* ------------- Reducers ------------- */

export const onGetAllBannersSuccess = (state, action) => ({
  ...state,
  loading: false,
  banners: action.data
});

export const onGetAllBannersFailure = (state, action) => ({
  ...state,
  loading: false,
  error: action.data
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.ON_TEST_REQUEST]: test
  [Types.ON_GET_ALL_BANNERS_SUCCESS]: onGetAllBannersSuccess,
  [Types.ON_GET_ALL_BANNERS_FAILURE]: onGetAllBannersFailure
});
