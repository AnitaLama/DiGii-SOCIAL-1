import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onSubmitCommentRequest: ['data']
});

export const CommentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false
});

/* ------------- Reducers ------------- */

export const onSubmitCommentRequest = (state, action) => ({
  ...state,
  loading: true
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_SUBMIT_COMMENT_REQUEST]: onSubmitCommentRequest
});
