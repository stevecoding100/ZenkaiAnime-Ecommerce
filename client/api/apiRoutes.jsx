const baseURL = import.meta.env.VITE_API_URL;
const apiRoutes = {
  searchAnime: (q) => `${baseURL}/anime/${q}`,
  getAnimeInfo: (id) => `${baseURL}/anime/info/${id}`,
  getTrendingAnime: (page = 1) => `${baseURL}/anime/trending`,
  getPopularAnime: () => `${baseURL}/anime/popular`,
  getStreamingLink: (id) => `${baseURL}/anime/watch/${id}`,
};
export default apiRoutes;
