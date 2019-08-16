import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onGetAllSchools: [],
  onGetAllSchoolsSuccess: ['data'],
  onGetAllSchoolsFailure: ['data']
});

export const SchoolTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  schools: []
});

/* ------------- Reducers ------------- */

const onGetAllSchoolsSuccess = (state, action) => {
  const { data } = action;
  return { ...state, loading: !state.loading, schools: data };
};

const onGetAllSchoolsFailure = (state, action) => ({
  ...state,
  loading: !state.loading
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_GET_ALL_SCHOOLS_SUCCESS]: onGetAllSchoolsSuccess,
  [Types.ON_GET_ALL_SCHOOLS_FAILURE]: onGetAllSchoolsFailure
});
