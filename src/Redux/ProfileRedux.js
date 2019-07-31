import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onGetUserInfo: ['data'],
  onGetUserInfoSuccess: ['data'],
  onGetAvatarOfTheUser: ['data']
});

export const ProfileTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  profile: null
});

/* ------------- Reducers ------------- */

const onGetUserInfoSuccess = (state, action) => ({
  ...state,
  loading: false,
  profile: action.data
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.ON_TEST_REQUEST]: test
  [Types.ON_GET_USER_INFO_SUCCESS]: onGetUserInfoSuccess
});
