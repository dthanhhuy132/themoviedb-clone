import axiosClient from './axiosClient';

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const movieType = {
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
};

export const tvType = {
  upcoming: 'upcoming',
  popular: 'popular',
  on_the_air: 'on_the_air',
};

const tmdbApi = {
  getMovieList(type, params) {
    const url = `movie/${movieType[type]}`;
    return axiosClient.get(url, params);
  },

  getTvList(type, params) {
    const url = `movie/${tvType[type]}`;
    return axiosClient.get(url, params);
  },

  getVideos(cate, id) {
    const url = `${category[cate]}/${id}/vides`;
    return axiosClient.get(url, { params: {} });
  },

  sarch(cate, params) {
    const url = `search/${category[cate]}`;
    return axiosClient.get(url, params);
  },

  detail(cate, id, params) {
    const url = `${category[cate]}/${id}/id`;
    return axiosClient.get(url, params);
  },

  credits(cate, id) {
    const url = `${category[cate]}/${id}/credits`;
    return axiosClient.get(url, { params: {} });
  },
  similar(cate, id, params) {
    const url = `${category[cate]}/${id}/silimar`;
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
