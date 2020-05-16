import photosReducer from './reducers/photosReducer';
import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import ReduxThunk from 'redux-thunk';

const persistConfig = {
  key: 'photos',
  storage: AsyncStorage,
  whitelist: ['photos'], // which reducer want to store
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  photos: photosReducer,
});

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = compose(applyMiddleware(ReduxThunk))(createStore)(
  pReducer,
);

export const persistor = persistStore(store);
