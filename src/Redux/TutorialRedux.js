import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onTutorialRequest: ['data'],
  onTutorialRequestSuccess: ['data'],
  onTutorialRequestFailure: ['data'],
  onSaveTutorialWatchersInfo: ['data']
});

export const TutorialTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  tutorialList: [],
  hasFinishedWatching: true
});

/* ------------- Reducers ------------- */

const onTutorialRequestSuccess = (state, action) => ({
  ...state,
  loading: false,
  tutorialList: action.data,
  hasFinishedWatching: false
});

const onTutorialRequestFailure = (state, action) => ({
  ...state,
  loading: false
});

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_TUTORIAL_REQUEST_SUCCESS]: onTutorialRequestSuccess,
  [Types.ON_TUTORIAL_REQUEST_FAILURE]: onTutorialRequestFailure
});
