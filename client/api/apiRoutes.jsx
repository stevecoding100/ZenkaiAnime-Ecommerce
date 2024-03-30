const baseURL = import.meta.env.VITE_API_URL;
const apiRoutes = {
  searchAnime: (q) => `https://cors-anywhere.herokuapp.com/${baseURL}/${q}`,
  getAnimeInfo: (id) =>
    `https://cors-anywhere.herokuapp.com/${baseURL}/info/${id}?provider=gogoanime`, // must provide gogoanime as provider [params]
  getTrendingAnime: (page = 1) =>
    `https://cors-anywhere.herokuapp.com/${baseURL}/trending?page=${page}&perPage=30`,
  getPopularAnime: () =>
    `$https://cors-anywhere.herokuapp.com/{baseURL}/popular`,
  getStreamingLink: (id) =>
    `https://cors-anywhere.herokuapp.com/${baseURL}/watch/${id}`,
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
