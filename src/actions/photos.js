import axios from 'axios';
import {
  GET_PHOTOS_LOADING,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_FAILED,
} from './types';

const getPhotosLoading = (bool) => {
  return {
    type: GET_PHOTOS_LOADING,
    bool,
  };
};

const getPhotosSuccess = (data) => {
  return {
    type: GET_PHOTOS_SUCCESS,
    payload: data,
  };
};

const getPhotosFailed = (error) => {
  return {
    type: GET_PHOTOS_FAILED,
    error,
  };
};

export const getPhotos = (searchValue) => async (dispatch) => {
  dispatch(getPhotosLoading(true));
  try {
    const resp = await axios({
      method: 'get',
      url: 'https://api.flickr.com/services/rest',
      params: {
        method: 'flickr.photos.getRecent',
        api_key: 'e002ffc19ba3422ef61de1d38dfc9d26',
        extras: 'url_n, owner_name, date_taken, views',
        page: 1,
        format: 'json',
        nojsoncallback: 1,
        per_page: 30,
      },
    });
    dispatch(getPhotosSuccess(resp.data.photos.photo));
  } catch (error) {
    dispatch(getPhotosFailed(error));
  }
};
