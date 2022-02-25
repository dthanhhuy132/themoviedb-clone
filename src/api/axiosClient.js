import axios from 'axios';
import apiConfig from './apiConfig';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: apiConfig.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (param) => queryString.stringify({ ...param, api_key: apiConfig.apiKey }),
});

// axiosClient.interceptors.request.use(async (config) => config);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
