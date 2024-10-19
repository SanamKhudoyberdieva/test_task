export const fetchMoviesByHeroId = async (heroId: string): Promise<any[]> => {
    const response = await fetch(`https://sw-api.starnavi.io/films/`);
    if (!response.ok) {
      throw new Error('Failed to fetch movies for the hero');
    }
    const data = await response.json();
    
    const moviesForHero = data.results.filter((movie: { characters: string | string[]; }) => 
      movie.characters.includes(`https://sw-api.starnavi.io/people/${heroId}/`)
    );
    
    return moviesForHero; 
  };