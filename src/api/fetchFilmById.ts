import api from "./api";

export const fetchFilmById = async (id: string) => {
  try {
    const response = await api.get(`films/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching film with id ${id}:`, error);
    throw error;
  }
};