import api from "./api";

export const fetchHeroById = async (id: string) => {
  try {
    const response = await api.get(`people/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching hero with id ${id}:`, error);
    throw error;
  }
};