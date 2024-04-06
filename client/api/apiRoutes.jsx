const baseURL = "https://zenkai-anime-ecommerce-zgi2.vercel.app//api/anime";
const apiRoutes = {
  searchAnime: (q) => `${baseURL}/${q}`,
  getAnimeInfo: (id) => `${baseURL}/${id}`, // must provide gogoanime as provider [params]
  getTrendingAnime: (page = 1) => `${baseURL}/trending`,
  getPopularAnime: () => `${baseURL}/popular`,
  getStreamingLink: (id) => `${baseURL}/api/anime/watch/${id}`,
};
export default apiRoutes;
