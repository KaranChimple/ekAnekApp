import { REHYDRATE } from 'redux-persist';
import {
  GET_PHOTOS_FAILED,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_LOADING,
} from '../actions/types';

const initialState = {
  isLoading: false,
  data: [],
  error: null,
};

const photosReducer = (state = initialState, action) => {
  console.log('Place Reducer: ', action);
  switch (action.type) {
    case REHYDRATE:
      console.log('Action from rehydrate: ', action);
      return {
        ...state,
        isLoading: false,
        error: false,
        data: action.payload.photos.data,
      };
    case GET_PHOTOS_LOADING:
      return {...state, isLoading: true};
    case GET_PHOTOS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        data: [...state.data, ...action.payload],
      };
    case GET_PHOTOS_FAILED:
      return {...state, isLoading: false, error: action.error};
    default:
      return state;
  }
};

export default photosReducer;
