import { fetchStarshipById } from "./getStarshipsById";

// Function to fetch multiple starships by an array of IDs
export const fetchStarshipsByIds = async (ids: string[]) => {
    const promises = ids.map(id => fetchStarshipById(id));
    return Promise.all(promises);
};