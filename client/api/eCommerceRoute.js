const baseURL = import.meta.env.VITE_API_URL_ECOMMERCE;

export const eCommerceRoutes = {
  getMerchandise: () => `${baseURL}/products`,
};
