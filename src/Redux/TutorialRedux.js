import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onTutorialRequest: ['data'],
  onTutorialRequestSuccess: ['data'],
  onTutorialRequestFailure: ['data']
});

export const TutorialTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  tutorialList: []
});

/* ------------- Reducers ------------- */

const onTutorialRequestSuccess = (state, action) => {
  console.log('here', action.data);
  return { ...state, loading: false, tutorialList: action.data };
};

const onTutorialRequestFailure = (state, action) => {
  console.log('here', action);
  return { ...state, loading: false };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_TUTORIAL_REQUEST_SUCCESS]: onTutorialRequestSuccess,
  [Types.ON_TUTORIAL_REQUEST_FAILURE]: onTutorialRequestFailure
});
