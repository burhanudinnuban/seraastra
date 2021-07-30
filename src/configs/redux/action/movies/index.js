import axios from 'axios';
import {reducer, server} from '../../../../constants';

export const requestGetMovies = data => dispatch => {
  dispatch({type: reducer.LOADING, value: true});
  axios.defaults.headers.common.Authorization = server.token;
  return new Promise((resolve, reject) => {
    axios
      .get(`${server.url}/popular?api_key=79c9e2ac329b9b744edf534069f90526`)
      .then(resp => {
        dispatch({type: reducer.LOADING, value: false});
        dispatch({type: reducer.DATA_MOVIES, value: resp.data});
        resolve(resp.data);
      })
      .catch(e => {
        dispatch({type: reducer.LOADING, value: false});
        reject(e);
      });
  });
};

export const requestGetDetailMovie = data => dispatch => {
  dispatch({type: reducer.LOADING, value: true});
  axios.defaults.headers.common.Authorization = server.token;
  return new Promise((resolve, reject) => {
    axios
      .get(`${server.url}/${data}?api_key=79c9e2ac329b9b744edf534069f90526`)
      .then(resp => {
        dispatch({type: reducer.LOADING, value: false});
        dispatch({type: reducer.DETAIL_MOVIE, value: resp.data});
        resolve(resp.data);
      })
      .catch(e => {
        dispatch({type: reducer.LOADING, value: false});
        reject(e);
      });
  });
};
