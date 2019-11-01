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
  onPostSubmitSuccess: ['data'],
  onPostSubmitFailure: ['data'],
  onTextPostSubmit: ['data'],
  onSaveImage: ['data'],
  onSaveImageSuccess: ['data'],
  onSaveImageFailure: ['data'],
  onFindGif: ['data'],
  onFindGifSuccess: ['data'],
  onFindGifFailure: ['data'],
  clearGifList: [],
  onPostImage: ['data'],
  onPostPoll: ['data'],
  onUploadImage: ['data'],
  onRespondToPoll: ['data'],
  onSubmitTagPost: ['data'],
  onVideoPost: ['data'],
  onPostDelete: ['data'],
  onCommentDelete: ['data'],
  onMasterDelete: ['data'],
  onEditPost: ['data'],
  onFindGifForComments: ['data'],
  onFindGifForCommentsSuccess: ['data'],
  onFindGifForCommentsFailure: ['data'],
  clearCommentGif: []
});

export const PostTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
  loading: false,
  posts: [],
  error: null,
  gif: [],
  page: 0,
  pageSize: 20,
  commentGif: []
});

/* ------------- Reducers ------------- */

const onListPosts = state => ({ ...state, loading: true });

const onListPostsSuccess = (state, action) => ({
  ...state,
  loading: false,
  posting: false,
  posts: action.data,
  error: null
});
const onListPostsFailure = (state, action) => ({
  ...state,
  loading: false,
  error: action.data,
  posting: false,

  gif: []
});

const onPostSubmit = state => ({
  ...state,
  loading: true,
  posting: true
});
const onPostSubmitSuccess = state => ({
  ...state,
  posting: false,
  loading: false
});
const onPostSubmitFailure = state => ({
  ...state,
  posting: false,
  loading: false
});
const onSaveImage = state => ({ ...state, loading: true, posting: true });
// console.log(action);
const onSaveImageSuccess = state => ({
  ...state,
  loading: false,
  posting: false
});
const onSaveImageFailure = state => ({
  ...state,
  loading: false,
  posting: false
});
const onFindPosts = (state, action) => ({
  ...state,
  loading: true,
  gif: [],
  error: null,
  posting: false
});

const onFindPostsFailure = (state, action) => ({
  ...state,
  loading: false,
  error: action.data,
  posting: false
});

const onFindPostsSuccess = (state, action) => {
  const { data } = action;
  const posts = [];

  data.map(item => {
    if (item.user || item.student) {
      posts.push(item);
    }
    return true;
  });
  return {
    ...state,
    posts: [...state.posts, ...action.data],
    gif: [],
    loading: false,
    posting: false
  };
};

const onFindGifSuccess = (state, action) => {
  console.log(action.data);
  return {
    ...state,
    gif: action.data,
    error: null,
    loading: false,
    posting: false
  };
};

const onFindGifFailure = (state, action) => {
  console.log(action.data);
  return {
    ...state,
    gif: action.data,
    error: null,
    loading: false,
    posting: false
  };
};
const onFindGifForCommentsSuccess = (state, action) => ({
  ...state,
  commentGif: action.data,
  error: null,
  loading: false,
  posting: false
});

const onFindGifForCommentsFailure = (state, action) => ({
  ...state,
  commentGif: action.data,
  error: null,
  loading: false,
  posting: false
});
const clearGifList = state => ({
  ...state,
  gif: [],
  loading: false,
  posting: false
});

const clearCommentGif = state => ({ ...state, commentGif: [] });
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_LIST_POSTS]: onListPosts,
  [Types.ON_LIST_POSTS_SUCCESS]: onListPostsSuccess,
  [Types.ON_LIST_POSTS_FAILURE]: onListPostsFailure,
  [Types.ON_FIND_POSTS]: onFindPosts,
  [Types.ON_FIND_POSTS_SUCCESS]: onFindPostsSuccess,
  [Types.ON_FIND_POSTS_FAILURE]: onFindPostsFailure,
  [Types.ON_POST_SUBMIT]: onPostSubmit,
  [Types.ON_POST_SUBMIT_SUCCESS]: onPostSubmitSuccess,
  [Types.ON_POST_SUBMIT_FAILURE]: onPostSubmitFailure,
  [Types.ON_SAVE_IMAGE]: onSaveImage,
  [Types.ON_SAVE_IMAGE_SUCCESS]: onSaveImageSuccess,
  [Types.ON_SAVE_IMAGE_FAILURE]: onSaveImageFailure,
  [Types.ON_FIND_GIF_SUCCESS]: onFindGifSuccess,
  [Types.ON_FIND_GIF_FAILURE]: onFindGifFailure,
  [Types.ON_FIND_GIF_FOR_COMMENTS_SUCCESS]: onFindGifForCommentsSuccess,
  [Types.ON_FIND_GIF_FOR_COMMENTS_FAILURE]: onFindGifForCommentsFailure,
  [Types.CLEAR_GIF_LIST]: clearGifList,
  [Types.CLEAR_COMMENT_GIF]: clearCommentGif
});
