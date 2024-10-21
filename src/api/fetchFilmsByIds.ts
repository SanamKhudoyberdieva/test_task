export const fetchFilmsByIds = async (filmIds: number[]) => {
    try {
        if (!Array.isArray(filmIds) || filmIds.length === 0) {
            throw new Error('Invalid film IDs');
        }
  
        const filmPromises = filmIds.map(id => fetch(`https://swapi.dev/api/films/${id}/`).then(res => res.json()));
        const films = await Promise.all(filmPromises);
        return films;
    } catch (error) {
        console.error('Error fetching films:', error);
        throw error; 
    }
  };
  