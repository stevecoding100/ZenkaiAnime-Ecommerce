const baseURL = "http://localhost:3000/api/anime";
const apiRoutes = {
  searchAnime: (q) => `${baseURL}/${q}`,
  getAnimeInfo: (id) => `${baseURL}/info/${id}`, // must provide gogoanime as provider [params]
  getTrendingAnime: (page = 1) => `${baseURL}/trending`,
  getPopularAnime: () => `${baseURL}/popular`,
  getStreamingLink: (id) => `${baseURL}/watch/${id}`,
};
export default apiRoutes;
