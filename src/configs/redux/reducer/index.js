import {persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import global from './global';
import movies from './movies';

const reducer = {global: global, movies: movies};

const configReduxPersist = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['global', 'movies'],
};

const reduxPersistReducer = persistCombineReducers(configReduxPersist, reducer);

export default reduxPersistReducer;
