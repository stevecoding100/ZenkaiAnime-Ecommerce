const baseURL = "https://zenkai-api.vercel.app/meta/anilist";

const apiRoutes = {
  searchAnime: (q) => `${baseURL}/${q}`,
  getAnimeInfo: (id) => `${baseURL}/info/${id}?provider="gogoanime"`,
  getTrendingAnime: () => `${baseURL}/trending`,
  getPopularAnime: () => `${baseURL}/popular`,
  getAnimeStreamingLink: (id) => `${baseURL}/watch/${id}`,
};

export default apiRoutes;
