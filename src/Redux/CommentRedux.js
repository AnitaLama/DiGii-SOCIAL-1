import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onSubmitCommentRequest: ['data'],
  onSubmitCommentSuccess: ['data'],
  onSubmitCommentFailure: ['data'],
  onCommentDelete: ['data'],
  onReactToAComment: ['data'],
  onReactToACommentSuccess: ['data'],
  onReactToACommentFailure: ['data'],
  onDisableCommentStrikesModal: []

});

export const CommentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false, showStrikeModal: false,
  strikedComment: null,
  strikedCommentTerms:[],
});

/* ------------- Reducers ------------- */

const onSubmitCommentRequest = state => ({
  ...state,
  loading: true
});

const onSubmitCommentSuccess = (state, action) => {
  const { Terms, strike, strikedPost } = action.data;
  console.log('reducer', action.data);
  
  return({
  ...state,
  loading: false,
  strikedCommentTerms: Terms,
  showStrikeModal: strike,
  strikedComment: strikedPost ? strikedPost.postCommentBody : null
})};

const onSubmitCommentFailure = state => ({
  ...state,
  loading: false
});
const onDisableCommentStrikesModal = (state )=>{
  console.log('disable comment');
  
  return({
  ...state,
  loading: false, showStrikeModal: false,
})}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_SUBMIT_COMMENT_REQUEST]: onSubmitCommentRequest,
  [Types.ON_SUBMIT_COMMENT_SUCCESS]: onSubmitCommentSuccess,
  [Types.ON_SUBMIT_COMMENT_FAILURE]: onSubmitCommentFailure,
  [Types.ON_DISABLE_COMMENT_STRIKES_MODAL]:onDisableCommentStrikesModal
  // [Types.ON_REACT_TO_A_COMMENT]: onReactToAComment
  // [Types.ON_COMMENT_DELETE]: onCommentDelete
});
