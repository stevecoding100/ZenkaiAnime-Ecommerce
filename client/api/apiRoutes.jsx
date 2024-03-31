const baseURL = import.meta.env.VITE_API_URL;
const apiRoutes = {
  searchAnime: (q) => `${baseURL}/${q}`,
  getAnimeInfo: (id) => `${baseURL}/info/${id}?provider=gogoanime`, // must provide gogoanime as provider [params]
  getTrendingAnime: (page = 1) => `${baseURL}/trending?page=${page}&perPage=30`,
  getPopularAnime: () => `${baseURL}/popular`,
  getStreamingLink: (id) => `${baseURL}/watch/${id}`,
  proxyConfig: {
    protocol: "https",
    host: import.meta.env.VITE_PROXY_HOST,
    port: import.meta.env.VITE_PROXY_PORT,
    auth: {
      username: import.meta.env.VITE_PROXY_USER,
      password: import.meta.env.VITE_PROXY_PASS,
    },
  },
};
export default apiRoutes;
