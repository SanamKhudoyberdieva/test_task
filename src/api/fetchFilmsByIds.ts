import { fetchFilmById } from "./getMoviesById";

// Function to fetch multiple films by an array of IDs
export const fetchFilmsByIds = async (ids: string[]) => {
    const promises = ids.map(id => fetchFilmById(id));
    return Promise.all(promises);
};