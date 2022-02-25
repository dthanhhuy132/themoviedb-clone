const apiConfig = {
  baseURL: 'https://api.themoviedb.org/3',
  apiKey: 'f19c25e70b0c454b7e7f657a20399289',
  originalImage: (imagePath) => `https://image.tmdb.org/t/p/original${imagePath}`,
  w500Image: (imagePath) => `https://image.tmdb.org/t/p/w500${imagePath}`,
};

export default apiConfig;
