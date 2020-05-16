import {ADD_PLACE} from './types';

const addPlaceSuccess = (placeName) => {
  return {
    type: ADD_PLACE,
    payload: placeName,
  };
};

export const addPlace = (placeName) => (dispatch) => {
  dispatch(addPlaceSuccess(placeName));
};
