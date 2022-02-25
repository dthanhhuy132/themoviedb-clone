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
    return axiosClient.get(url, { params });
  },

  getVideos(cate, id) {
    const url = `${category[cate]}/${id}/videos`;
    return axiosClient.get(url, { params: {} });
  },

  search(params) {
    const url = `search/multi`;
    return axiosClient.get(url, { params });
  },

  detail(cate, id, params) {
    const url = `${category[cate]}/${id}`;
    return axiosClient.get(url, { params: {} });
  },

  credits(cate, id) {
    const url = `${category[cate]}/${id}/credits`;
    return axiosClient.get(url, { params: {} });
  },

  similar(cate, id, params) {
    const url = `${category[cate]}/${id}/similar`;
    return axiosClient.get(url, { params: {} });
  },
};

export default tmdbApi;
