import { fetchFilmById } from "./fetchFilmById";

export const fetchFilmsByIds = async (ids: string[]) => {
    const promises = ids.map(id => fetchFilmById(id));
    return Promise.all(promises);
};