import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  onGetAllOptionsSuccess: ['data']
});

export const OptionTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  options: []
});

/* ------------- Reducers ------------- */

const onGetAllOptionsSuccess = (state, action) => {
  const { options } = action.data;
  let data = {};
  console.log('options', options);
  options.length > 0
    && options.map(item => {
      data = {
        ...data,
        [item.optionMeta]: parseInt(item.optionData) || item.optionData
      };
    });
  console.log('reducer data', data);
  return { ...state, loading: false, options: data };
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ON_GET_ALL_OPTIONS_SUCCESS]: onGetAllOptionsSuccess
});
