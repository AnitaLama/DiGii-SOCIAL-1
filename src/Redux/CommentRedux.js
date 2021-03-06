import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onSubmitCommentRequest: ['data'],
  onCommentDelete: ['data']
});

export const CommentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false
});

/* ------------- Reducers ------------- */

const onSubmitCommentRequest = state => ({
  ...state,
  loading: true
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_SUBMIT_COMMENT_REQUEST]: onSubmitCommentRequest
  // [Types.ON_COMMENT_DELETE]: onCommentDelete
});
