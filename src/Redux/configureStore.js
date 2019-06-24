import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from '../Saga';

import rootReducer from './index';

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga, store.dispatch);

  return { store, persistor };
};
//
// const sagaMiddleware = createSagaMiddleware();
//
// export default () => {
//   const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
//   sagaMiddleware.run(rootSaga, store.dispatch);
//
//   return { store };
// };
