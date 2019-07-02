import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onListPostTypes: [],
  onListPostTypesSuccess: ['data'],
  onListPostTypesFailure: ['data']
});

export const PostTypeTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  postTypes: [],
  error: null
});

/* ------------- Reducers ------------- */

const onListPostTypes = (state, action) => ({ ...state, loading: true });
const onListPostTypesSuccess = (state, action) => {
  const { data } = action;
  return {
    ...state,
    loading: false,
    postTypes: data
  };
};
const onListPostTypesFailure = (state, action) => {
  const { data } = action;

  return {
    ...state,
    loading: false,
    error: data
  };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_LIST_POST_TYPES]: onListPostTypes,
  [Types.ON_LIST_POST_TYPES_SUCCESS]: onListPostTypesSuccess,
  [Types.ON_LIST_POST_TYPES_FAILURE]: onListPostTypesFailure
});
