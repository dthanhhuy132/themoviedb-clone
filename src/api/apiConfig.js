console.log(process.env);

const apiConfig = {
  baseURL: 'https://api.themoviedb.org/3',
  apiKey: process.env.REACT_APP_API_KEY,
  originalImage: (imagePath) => `https://image.tmdb.org/t/p/original${imagePath}`,
  w500Image: (imagePath) => `https://image.tmdb.org/t/p/w500${imagePath}`,
};

export default apiConfig;
