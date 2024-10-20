import { fetchStarshipById } from "./fetchStarshipById";

export const fetchStarshipsByIds = async (ids: string[]) => {
    const promises = ids.map(id => fetchStarshipById(id));
    return Promise.all(promises);
};