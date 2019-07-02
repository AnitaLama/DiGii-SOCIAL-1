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
  onStudentFormLoginFailure: ['data']
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
    userType: '',
    id: ''
  },
  error: null
});

/* ------------- Reducers ------------- */

const onFormLogin = (state, action) => ({ ...state, loading: false });
const onFormLoginSuccess = (state, action) => {
  const { u_name, u_password, user_profile } = action.data[0];
  const { up_firstname, up_lastname, up_u_id } = user_profile;
  console.log({ user_profile });
  return {
    ...state,
    loading: true,
    error: null,
    user: {
      ...state.user,
      username: u_name,
      firstname: up_firstname,
      lastname: up_lastname,
      password: u_password,
      id: up_u_id
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
  } = action.data[0];
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
      type: 'Student'
    }
  };
};

const onStudentFormLoginFailure = (state, action) => {
  const { data } = action;
  return { ...state, error: data, loading: false };
};

const onLogOut = () => INITIAL_STATE;
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_FORM_LOGIN_REQUEST]: onFormLogin,
  [Types.ON_FORM_LOGIN_SUCCESS]: onFormLoginSuccess,
  [Types.ON_FORM_LOGIN_FAILURE]: onFormLoginFailure,
  [Types.ON_STUDENT_FORM_LOGIN_REQUEST]: onStudentFormLogin,
  [Types.ON_STUDENT_FORM_LOGIN_SUCCESS]: onStudentFormLoginSuccess,
  [Types.ON_STUDENT_FORM_LOGIN_FAILURE]: onStudentFormLoginFailure,
  [Types.ON_LOG_OUT]: onLogOut
});
