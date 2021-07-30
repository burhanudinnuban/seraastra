import {reducer} from '../../../../constants';

const initialStateRoot = {
  dataMovies: undefined,
  dataFavourites: [],
  detailMovie: undefined,
};

const movies = (state = initialStateRoot, action) => {
  switch (action.type) {
    case reducer.DATA_MOVIES:
      return {
        ...state,
        dataMovies: action.value,
      };
    case reducer.DATA_FAVOURITES:
      return {
        ...state,
        dataFavourites: action.value,
      };
    case reducer.DETAIL_MOVIE:
      return {
        ...state,
        detailMovie: action.value,
      };

    default:
      return state;
  }
};

export default movies;
