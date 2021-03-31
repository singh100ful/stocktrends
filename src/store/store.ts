import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistCombineReducers, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Login from 'src/store/reducers/login';
import Stocks from 'src/store/reducers/stocks';
import Search from 'src/store/reducers/search';

const config = {
  key: 'Stocks',
  version: 0,
  storage: AsyncStorage,
};

const rootReducer = persistCombineReducers(config, {
  login: Login,
  stocks: Stocks,
  search: Search,
});

export type RootState = ReturnType<typeof rootReducer>;

let composeEnhancers = compose;

const store = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger)),
  );

  const persistor = persistStore(store);

  return {persistor, store};
};

export default store;
