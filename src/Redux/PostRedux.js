import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onListPosts: [],
  onFindPosts: ['data'],
  onFindPostsSuccess: ['data'],
  onFindPostsFailure: ['data'],
  onListPostsSuccess: ['data'],
  onListPostsFailure: ['data'],
  onPostSubmit: ['data'],
  onSaveImage: ['data']
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

const onPostSubmit = (state, action) => ({
  ...state
});
const onSaveImage = (state, action) => {
  console.log(action);
  return { ...state };
};

const onFindPosts = (state, action) => ({ ...state, loading: true });

const onFindPostsSuccess = (state, action) => {
  const { data } = action;
  const posts = [];
  data.map(item => {
    if (item.user || item.student) {
      posts.push(item);
    }
  });
  // console.log('reducer', action.data, posts);
  return { ...state, posts: action.data };
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_LIST_POSTS]: onListPosts,
  [Types.ON_LIST_POSTS_SUCCESS]: onListPostsSuccess,
  [Types.ON_LIST_POSTS_FAILURE]: onListPostsFailure,
  [Types.ON_FIND_POSTS]: onFindPosts,
  [Types.ON_FIND_POSTS_SUCCESS]: onFindPostsSuccess,
  // [Types.ON_FIND_POSTS_FAILURE]: onFindPostsFailure,
  [Types.ON_POST_SUBMIT]: onPostSubmit,
  [Types.ON_SAVE_IMAGE]: onSaveImage
});
