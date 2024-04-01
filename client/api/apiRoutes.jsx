const baseURL = "http://localhost:3000/api/anime";
const apiRoutes = {
  searchAnime: (q) => `https://cors-anywhere.herokuapp.com/${baseURL}/${q}`,
  getAnimeInfo: (id) => `${baseURL}/info/${id}`, // must provide gogoanime as provider [params]
  getTrendingAnime: (page = 1) => `${baseURL}/trending`,
  getPopularAnime: () => `${baseURL}/popular`,
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
