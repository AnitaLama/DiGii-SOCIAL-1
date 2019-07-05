import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onFormLoginRequest: ['data'],
  onFormLoginSuccess: ['data'],
  onFormLoginFailure: ['data'],
  onLogOut: [],
  onStudentFormLoginRequest: ['data'],
  onStudentFormLoginSuccess: ['data'],
  onStudentFormLoginFailure: ['data'],
  onDisableFirstTimePosting: []
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  user: {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    isStudent: false,
    id: '',
    isFirstTimePosting: true
  },
  error: null
});

/* ------------- Reducers ------------- */

const onFormLogin = (state, action) => ({ ...state, loading: false });
const onFormLoginSuccess = (state, action) => {
  console.log('success', action.data);
  const {
    u_id, u_name, u_activated, user_profile
  } = action.data;
  const firstname = user_profile.up_firstname || '';
  const lastname = user_profile.up_lastname || '';
  return {
    ...state,
    loading: true,
    error: null,
    user: {
      ...state.user,
      username: u_name,
      firstname,
      lastname,
      id: u_id,
      isStudent: false,
      isActivated: u_activated
    }
  };
};

const onFormLoginFailure = (state, action) => {
  const { data } = action;
  return { ...state, error: data, loading: false };
};

const onStudentFormLogin = (state, action) => ({ ...state, loading: false });
const onStudentFormLoginSuccess = (state, action) => {
  const {
    st_username, st_firstname, st_lastname, st_id
  } = action.data;
  return {
    ...state,
    userType: 'Student',
    loading: true,
    error: null,
    user: {
      ...state.user,
      username: st_username,
      firstname: st_firstname,
      lastname: st_lastname,
      password: null,
      id: st_id,
      isStudent: true
    }
  };
};

const onStudentFormLoginFailure = (state, action) => {
  const { data } = action;
  return { ...state, error: data, loading: false };
};

const onLogOut = () => INITIAL_STATE;

const onDisableFirstTimePosting = state => ({
  ...state,
  user: {
    ...state.user,
    isFirstTimePosting: false
  }
});
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_FORM_LOGIN_REQUEST]: onFormLogin,
  [Types.ON_FORM_LOGIN_SUCCESS]: onFormLoginSuccess,
  [Types.ON_FORM_LOGIN_FAILURE]: onFormLoginFailure,
  [Types.ON_STUDENT_FORM_LOGIN_REQUEST]: onStudentFormLogin,
  [Types.ON_STUDENT_FORM_LOGIN_SUCCESS]: onStudentFormLoginSuccess,
  [Types.ON_STUDENT_FORM_LOGIN_FAILURE]: onStudentFormLoginFailure,
  [Types.ON_LOG_OUT]: onLogOut,
  [Types.ON_DISABLE_FIRST_TIME_POSTING]: onDisableFirstTimePosting
});
