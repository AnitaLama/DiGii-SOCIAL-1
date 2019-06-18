import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onFormLoginRequest: ['data'],
  onFormLoginSuccess: ['data']
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
  }
});

/* ------------- Reducers ------------- */

const onFormLogin = (state, action) => ({ ...state, loading: !state.loading });
const onFormLoginSuccess = (state, action) => {
  const {
    userName, email, firstName, lastName, password
  } = action.data[0];
  return {
    ...state,
    loading: !state.loading,
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_FORM_LOGIN_REQUEST]: onFormLogin,
  [Types.ON_FORM_LOGIN_SUCCESS]: onFormLoginSuccess
});
