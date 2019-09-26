import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onFormLoginRequest: ['data'],
  onFormLoginSuccess: ['data'],
  onLogOut: [],
  onStudentFormLoginRequest: ['data'],
  onStudentFormLoginSuccess: ['data'],
  onEnableFirstTimePosting: [],
  onDisableFirstTimePosting: [],
  onBlockUser: ['data'],
  onSaveMyAvatar: ['data'],
  onSaveMyAvatarSuccess: ['data'],
  updateTotalActivities: []
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
    isFirstTimeAskingHelpFrom: true,
    totalActivities: 0
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
    postCounts,
    replyCounts
  } = action.data;
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
      isFirstTimePosting: !(postCounts > 0),
      totalActivities: postCounts + replyCounts
    }
  };
};
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
    postCounts,
    helpsAsked,
    replyCounts
  } = action.data;
  const { school_group } = student_group;
  const { schoolGroupsId } = school_group;
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
      isFirstTimePosting: !(postCounts > 0),
      totalActivities: postCounts + replyCounts
    },
    error: null
  };
};

const onLogOut = () => INITIAL_STATE;

const onEnableFirstTimePosting = state => ({
  ...state,
  user: {
    ...state.user,
    isFirstTimePosting: true,
    error: null
  }
});

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

const updateTotalActivities = state => ({
  ...state,
  user: {
    ...state.user,
    totalActivities: state.totalActivities + 1
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
  [Types.ON_DISABLE_FIRST_TIME_POSTING]: onDisableFirstTimePosting,
  [Types.ON_SAVE_MY_AVATAR_SUCCESS]: onSaveMyAvatarSuccess,
  [Types.UPDATE_TOTAL_ACTIVITIES]: updateTotalActivities
});
