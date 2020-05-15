import {ADD_PLACE} from './types';

const addPlaceSuccess = (placeName) => {
  return {
    type: ADD_PLACE,
    payload: placeName,
  };
};

export const addPlace = (placeName) => (dispatch) => {
  console.log('Value received', placeName);
  dispatch(addPlaceSuccess(placeName));
};
