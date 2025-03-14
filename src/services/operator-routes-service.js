import apiClient from "./APIClient";

export const createOperatorRoute = async (payload) => {
  const lang = localStorage.getItem("i18nextLng");
  try {
    const res = await apiClient.post(`routes?lang=${lang}`, payload);
    console.log(res);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateOperatorRoute = async (id, payload) => {
  const lang = localStorage.getItem("i18nextLng");
  try {
    const res = await apiClient.patch(`routes/${id}?lang=${lang}`, payload);
    console.log(res);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getRoutes = async (filters) => {
  const lang = localStorage.getItem("i18nextLng");

  const params = new URLSearchParams();
  params.append("lang", lang);
  if (filters.page) params.append("page", filters.page);
  if (filters.limit) params.append("limit", filters.limit);
  if (filters.province_id) params.append("province_id", filters.province_id);
  if (filters.status) params.append("status", filters.status);
  if (filters.search) params.append("search", filters.search);

  try {
    const res = await apiClient.get(`routes?${params}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRoute = async (id) => {
  const lang = localStorage.getItem("i18nextLng");
  try {
    const res = await apiClient.delete(`routes/${id}?lang=${lang}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getRoute = async (id) => {
  const lang = "all";
  try {
    const res = await apiClient.get(`routes/${id}?lang=${lang}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getCities = async () => {
  const lang = localStorage.getItem("i18nextLng");
  try {
    const res = await apiClient.get(`cities?lang=${lang}`);
    console.log(res);
    return res.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getProvinces = async () => {
  const lang = localStorage.getItem("i18nextLng");
  try {
    const res = await apiClient.get(`provinces?lang=${lang}`);
    console.log(res);
    return res.data?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
