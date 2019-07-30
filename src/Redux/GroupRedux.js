import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onGetAllUsersOfAGroup: ['data'],
  onGetAllUsersOfAGroupSuccess: ['data']
});

export const GroupTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  users: []
});

/* ------------- Reducers ------------- */

export const onGetAllUsersOfAGroupSuccess = (state, action) => {
  console.log('here', action);
  return { ...state, loading: false, users: action.data };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.ON_TEST_REQUEST]: test,
  [Types.ON_GET_ALL_USERS_OF_A_GROUP_SUCCESS]: onGetAllUsersOfAGroupSuccess
});
