import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onFormLoginRequest: ['data'],
  onFormLoginSuccess: ['data'],
  onFormLoginFailure: ['data'],
  onLogOut: []
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  user: {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    userType: ''
  },
  error: null
});

/* ------------- Reducers ------------- */

const onFormLogin = (state, action) => ({ ...state, loading: false });
const onFormLoginSuccess = (state, action) => {
  const {
    userName, email, firstName, lastName, password
  } = action.data[0];
  return {
    ...state,
    loading: true,
    error: null,
    user: {
      ...state.user,
      userName,
      email,
      firstName,
      lastName,
      password
    }
  };
};

const onFormLoginFailure = (state, action) => {
  const { data } = action;
  return { ...state, error: data, loading: false };
};

const onLogOut = state => INITIAL_STATE;
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_FORM_LOGIN_REQUEST]: onFormLogin,
  [Types.ON_FORM_LOGIN_SUCCESS]: onFormLoginSuccess,
  [Types.ON_FORM_LOGIN_FAILURE]: onFormLoginFailure,
  [Types.ON_LOG_OUT]: onLogOut
});
