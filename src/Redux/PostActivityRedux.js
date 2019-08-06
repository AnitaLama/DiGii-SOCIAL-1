import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onGetPostActivitiesOfAUser: ['data'],
  onGetPostActivitiesOfAUserSuccess: ['data'],
  onGetPostActivitiesOfAUserFailure: ['data'],
  onGetPostActivitiesReactionTypes: ['data'],
  onGetPostActivitiesReactionTypesSuccess: ['data'],
  onGetPostActivitiesReactionTypesFail: ['data'],
  onSelectReaction: ['data']
});

export const PostActivityTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  postActivity: [],
  postActivityReactionTypes: [],
  error: null
});

/* ------------- Reducers ------------- */

const onGetPostActivitiesOfAUser = state => ({
  ...state,
  loading: true
});
const onGetPostActivitiesOfAUserSuccess = (state, action) => ({
  ...state,
  loading: false,
  postActivity: action.data,
  error: null
});
const onGetPostActivitiesOfAUserFailure = (state, action) => ({
  ...state,
  loading: false,
  error: action.data
});
const onGetPostActivitiesReactionTypes = state => ({
  ...state,
  loading: true
});
const onGetPostActivitiesReactionTypesSuccess = (state, action) => ({
  ...state,
  loading: false,
  postActivityReactionTypes: action.data,
  error: null
});
const onGetPostActivitiesReactionTypesFail = (state, action) => ({
  ...state,
  loading: false,
  error: action.data
});
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_GET_POST_ACTIVITIES_OF_A_USER]: onGetPostActivitiesOfAUser,
  [Types.ON_GET_POST_ACTIVITIES_OF_A_USER_SUCCESS]: onGetPostActivitiesOfAUserSuccess,
  [Types.ON_GET_POST_ACTIVITIES_OF_A_USER_FAILURE]: onGetPostActivitiesOfAUserFailure,
  [Types.ON_GET_POST_ACTIVITIES_REACTION_TYPES]: onGetPostActivitiesReactionTypes,
  [Types.ON_GET_POST_ACTIVITIES_REACTION_TYPES_SUCCESS]: onGetPostActivitiesReactionTypesSuccess,
  [Types.ON_GET_POST_ACTIVITIES_REACTION_TYPES_FAIL]: onGetPostActivitiesReactionTypesFail
});
