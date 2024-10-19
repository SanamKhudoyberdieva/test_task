export const fetchStarshipsByMovieId = async (movieId: string): Promise<any[]> => {
    const response = await fetch(`https://sw-api.starnavi.io/starships/`);
    if (!response.ok) {
      throw new Error('Failed to fetch starships for the movie');
    }
    const data = await response.json();
    
    const starshipsForMovie = data.results.filter((starship: { films: string | string[]; }) => 
      starship.films.includes(`https://sw-api.starnavi.io/films/${movieId}/`)
    );
    
    return starshipsForMovie; 
  };