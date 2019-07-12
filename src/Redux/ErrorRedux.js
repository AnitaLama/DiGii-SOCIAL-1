import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onFormLoginFailure: ['data'],
  onStudentFormLoginFailure: ['data']
});

export const ErrorTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loginError: null,
  studentLoginError: null
});

/* ------------- Reducers ------------- */

const onFormLoginFailure = (state, action) => {
  const { data } = action;
  return { ...state, loginError: data };
};

const onStudentFormLoginFailure = (state, action) => {
  const { data } = action;
  return { ...state, studentLoginError: data };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_FORM_LOGIN_FAILURE]: onFormLoginFailure,
  [Types.ON_STUDENT_FORM_LOGIN_FAILURE]: onStudentFormLoginFailure
});
