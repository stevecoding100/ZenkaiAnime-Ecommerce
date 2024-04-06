const apiRoutes = {
  searchAnime: (q) => `/api/anime/${q}`,
  getAnimeInfo: (id) => `/api/anime/info/${id}`,
  getTrendingAnime: (page = 1) => `/api/anime/trending`,
  getPopularAnime: () => `/api/anime/popular`,
  getStreamingLink: (id) => `/api/anime/watch/${id}`,
};
export default apiRoutes;
