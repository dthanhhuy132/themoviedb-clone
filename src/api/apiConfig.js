const apiConfig = {
  baseURL: 'https://api.themoviedb.org/3',
  apiKey: process.env.API_KEY,
  originalImage: (imagePath) => `https://image.tmdb.org/t/p/original${imagePath}`,
  w500Image: (imagePath) => `https://image.tmdb.org/t/p/w500${imagePath}`,
};

export default apiConfig;
