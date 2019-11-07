import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onGetStrikesCountOfAUser: ['data'],
  onGetStrikesCountOfAUserSuccess: ['data'],
  onGetStrikesCountOfAUserFailure: ['data'],
  onRemoveTheStrikes: ['data'],
  updateStrikeCount: ['data']
});

export const StrikeTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  strikes: 0
});

/* ------------- Reducers ------------- */

const onGetStrikesCountOfAUser = state => ({ ...state, loading: true });
const onGetStrikesCountOfAUserSuccess = (state, action) => ({
  ...state,
  strikes: action.data.strikes,
  loading: false
});
const onGetStrikesCountOfAUserFailure = state => ({
  ...state,
  loading: false
});
const onRemoveTheStrikes = state => ({ ...state, strikes: 0 });

const updateStrikeCount = (state, action) => {
  console.log('update strike', action.data);
  return { ...state, strikes: action.data };
};
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_GET_STRIKES_COUNT_OF_A_USER]: onGetStrikesCountOfAUser,
  [Types.ON_GET_STRIKES_COUNT_OF_A_USER_SUCCESS]: onGetStrikesCountOfAUserSuccess,
  [Types.ON_GET_STRIKES_COUNT_OF_A_USER_FAILURE]: onGetStrikesCountOfAUserFailure,
  [Types.ON_REMOVE_THE_STRIKES]: onRemoveTheStrikes,
  [Types.UPDATE_STRIKE_COUNT]: updateStrikeCount
  // [Types.RESET_STRIKES]: resetStrikes
});
