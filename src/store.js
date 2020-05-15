import photosReducer from './reducers/photosReducer';
import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  photos: photosReducer,
});

let store = compose(applyMiddleware(ReduxThunk))(createStore)(rootReducer);

export default store;
