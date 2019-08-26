import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onGetAllInternalHelpers: ['data'],
  onGetAllInternalHelpersSuccess: ['data'],
  onGetAllInternalHelpersFailure: ['data'],
  onSaveNeedHelp: ['data'],
  onGetHelpNotificationsCount: ['data']
});

export const HelperTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  internalHelpersList: [],
  externalHelpersList: []
});

/* ------------- Reducers ------------- */

const onGetAllInternalHelpersSuccess = (state, action) => {
  console.log('here>>>>', action);
  return { ...state, loading: false, internalHelpersList: action.data };
};

const onGetAllInternalHelpersFailure = (state, action) => {
  console.log('here', action);
  return { ...state, loading: false };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // [Types.ON_TEST_REQUEST]: test
  [Types.ON_GET_ALL_INTERNAL_HELPERS_SUCCESS]: onGetAllInternalHelpersSuccess,
  [Types.ON_GET_ALL_INTERNAL_HELPERS_FAILURE]: onGetAllInternalHelpersFailure
});
