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
  onBlockUser: ['data'],
  onSaveMyAvatar: ['data'],
  onSaveMyAvatarSuccess: ['data']
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
    groupId: null,
    avatarId: null,
    avatar: null,
    isFirstTimeAskingHelp: true,
    isFirstTimeAskingHelpFor: true,
    isFirstTimeAskingHelpWhen: true,
    isFirstTimeAskingHelpFrom: true
  },
  error: null
});

/* ------------- Reducers ------------- */

const onFormLogin = (state, action) => ({ ...state, loading: false });
const onFormLoginSuccess = (state, action) => {
  const {
    userId,
    userName,
    userAvatarId,
    userActivated,
    user_profile,
    user_groups,
    avatar,
    total
  } = action.data;
  // const firstname = user_profile.userProfileFirstname || '';
  // const lastname = user_profile.userProfileLastname || '';
  // const { user_groups } = user_profile;
  // const { ug_scg_id } = user_groups[0];
  const groups = [];
  user_groups.map(item => {
    groups.push(item.school_group.schoolGroupsId);
    return true;
  });
  return {
    ...state,
    loading: true,
    error: null,
    user: {
      ...state.user,
      username: userName,
      firstname: 'anita',
      lastname: 'lama',
      id: userId,
      isStudent: false,
      isActivated: userActivated,
      groupId: groups,
      avatarId: userAvatarId,
      avatar,
      isFirstTimePosting: !(total > 0)
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
    studentUsername,
    studentFirstname,
    studentLastname,
    studentId,
    student_group,
    studentAvatarId,
    avatar,
    total,
    helpsAsked
  } = action.data;
  const { school_group } = student_group;
  const { schoolGroupsId } = school_group;
  // const isFirstTimeAskingHelpFor = !!helpsAsked.map(
  //   item => item.needHelpIdFor || item.needHelpForName
  // );
  // const isFirstTimeAskingHelpFrom = !!helpsAsked.map(
  //   item => item.needhelpFromId || item.needhelpFromName
  // );
  // console.log('reducer:', isFirstTimeAskingHelpFor, isFirstTimeAskingHelpFrom);
  groups.push(schoolGroupsId);
  return {
    ...state,
    user: {
      ...state.user,
      username: studentUsername,
      firstname: studentFirstname,
      lastname: studentLastname,
      password: null,
      id: studentId,
      isStudent: true,
      groupId: groups,
      avatarId: studentAvatarId,
      avatar,
      isFirstTimePosting: !(total > 0)
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
  //   //   username: studentUsername,
  //   //   firstname: studentFirstname,
  //   //   lastname: st_lastname,
  //   //   password: null,
  //   //   id: studentId,
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

const onSaveMyAvatarSuccess = (state, action) => ({
  ...state,
  user: { ...state.user, avatar: action.data }
});
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_FORM_LOGIN_REQUEST]: onFormLogin,
  [Types.ON_FORM_LOGIN_SUCCESS]: onFormLoginSuccess,
  // [Types.ON_FORM_LOGIN_FAILURE]: onFormLoginFailure,
  [Types.ON_STUDENT_FORM_LOGIN_REQUEST]: onStudentFormLogin,
  [Types.ON_STUDENT_FORM_LOGIN_SUCCESS]: onStudentFormLoginSuccess,
  [Types.ON_LOG_OUT]: onLogOut,
  [Types.ON_DISABLE_FIRST_TIME_POSTING]: onDisableFirstTimePosting,
  [Types.ON_SAVE_MY_AVATAR_SUCCESS]: onSaveMyAvatarSuccess
});
