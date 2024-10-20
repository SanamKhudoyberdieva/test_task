import api from "./api";

// Function to get detailed information about a starship
export const fetchStarshipById = async (id: string) => {
    try {
        const response = await api.get(`starships/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching starship with id ${id}:`, error);
        throw error;
    }
};