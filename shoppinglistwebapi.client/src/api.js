import axios from "axios";

const api = axios.create({
  baseURL: `https://localhost:7263/`,
});
export const getCategories = async () => {
  const response = await api.get("api/Category");
  return response.data;
};
export const getTotalItems = async () => {
  const response = await api.get("api/Category/sum");
  return response.data;
};
export const getCategoriesProducts = async () => {
  const response = await api.get("api/Category/products");
  return response.data;
};
export const getProducts = async () => {
  const products = await api.get("api/Product");
  return products.data;
};

export const addProduct = async (productName, categoryId) => {
  await api.post("api/Product/add", {
    CategoryId: categoryId,
    ProductName: productName,
  });
};
export const deleteProduct = async (id) => {
  await api.delete(`api/Product/${id}`);
};

export default api;
