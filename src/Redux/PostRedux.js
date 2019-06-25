import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onListPosts: [],
  onListPostsSuccess: ['data'],
  onListPostsFailure: ['data']
});

export const PostTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  loading: false,
  posts: [],
  error: null
});

/* ------------- Reducers ------------- */

const onListPosts = (state, action) => ({ ...state, loading: true });

const onListPostsSuccess = (state, action) => ({
  ...state,
  loading: false,
  posts: action.data,
  error: null
});
const onListPostsFailure = (state, action) => ({
  ...state,
  loading: false,
  error: action.data
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_LIST_POSTS]: onListPosts,
  [Types.ON_LIST_POSTS_SUCCESS]: onListPostsSuccess,
  [Types.ON_LIST_POSTS_FAILURE]: onListPostsFailure
});
