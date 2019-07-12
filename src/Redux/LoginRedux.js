import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onFormLoginRequest: ['data'],
  onFormLoginSuccess: ['data'],
  onLogOut: [],
  onStudentFormLoginRequest: ['data'],
  onStudentFormLoginSuccess: ['data'],
  onDisableFirstTimePosting: [],
  onBlockUser: ['data']
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
    isFirstTimePosting: true,
    groupId: null
  },
  error: null
});

/* ------------- Reducers ------------- */

const onFormLogin = (state, action) => ({ ...state, loading: false });
const onFormLoginSuccess = (state, action) => {
  const {
    u_id, u_name, u_activated, user_profile, user_groups
  } = action.data;
  const firstname = user_profile.up_firstname || '';
  const lastname = user_profile.up_lastname || '';
  // const { user_groups } = user_profile;
  // const { ug_scg_id } = user_groups[0];
  const groups = [];
  user_groups.map(item => {
    groups.push(item.school_group.scg_id);
    return true;
  });
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
      isActivated: u_activated,
      groupId: groups
    }
  };
};

// const onFormLoginFailure = (state, action) => {
//   const { data } = action;
//   return { ...state, error: data, loading: false };
// };

const onStudentFormLogin = (state, action) => ({ ...state, loading: false });
const onStudentFormLoginSuccess = (state, action) => {
  const groups = [];
  const {
    st_username,
    st_firstname,
    st_lastname,
    st_id,
    student_group
  } = action.data;
  const { school_group } = student_group;
  const { scg_gr_id } = school_group;
  groups.push(scg_gr_id);
  return {
    ...state,
    user: {
      ...state.user,
      username: st_username,
      firstname: st_firstname,
      lastname: st_lastname,
      password: null,
      id: st_id,
      isStudent: true,
      groupId: groups
    },
    error: null
  };

  // return {
  //   ...state
  //   // userType: 'Student',
  //   // loading: true,
  //   // error: null,
  //   // user: {
  //   //   ...state.user,
  //   //   username: st_username,
  //   //   firstname: st_firstname,
  //   //   lastname: st_lastname,
  //   //   password: null,
  //   //   id: st_id,
  //   //   isStudent: true
  //   // }
  // };
};

const onLogOut = () => INITIAL_STATE;

const onDisableFirstTimePosting = state => ({
  ...state,
  user: {
    ...state.user,
    isFirstTimePosting: false,
    error: null
  }
});
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_FORM_LOGIN_REQUEST]: onFormLogin,
  [Types.ON_FORM_LOGIN_SUCCESS]: onFormLoginSuccess,
  // [Types.ON_FORM_LOGIN_FAILURE]: onFormLoginFailure,
  [Types.ON_STUDENT_FORM_LOGIN_REQUEST]: onStudentFormLogin,
  [Types.ON_STUDENT_FORM_LOGIN_SUCCESS]: onStudentFormLoginSuccess,
  [Types.ON_LOG_OUT]: onLogOut,
  [Types.ON_DISABLE_FIRST_TIME_POSTING]: onDisableFirstTimePosting
});
