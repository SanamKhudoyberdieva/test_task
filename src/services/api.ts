import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sw-api.starnavi.io/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get heroes
export const fetchHeroes = async (url: string) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching heroes:', error);
    throw error;
  }
};

// Function to get detailed information about a hero
export const fetchHeroById = async (id: string) => {
  try {
    const response = await api.get(`people/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching hero with id ${id}:`, error);
    throw error;
  }
};

// Function to fetch movies by hero ID
export const fetchMoviesByHeroId = async (heroId: string) => {
  try {
    const response = await api.get(`people/${heroId}`);
    const films = response.data.films; // This is an array of film IDs

    if (!Array.isArray(films)) {
      console.error(`Expected films to be an array, got ${typeof films}`);
      return []; // Return an empty array if films is not an array
    }

    // Map over the film IDs to construct API calls for each film
    const moviePromises = films.map(async (filmId: number) => {
      const filmResponse = await api.get(`films/${filmId}`);
      return filmResponse.data; // Return the film data
    });

    return await Promise.all(moviePromises); // Wait for all movie promises to resolve
  } catch (error) {
    console.error(`Error fetching movies for hero with id ${heroId}:`, error);
    throw error; // Re-throw the error to be handled in the calling function
  }
};

// Function to fetch starships by movie ID
export const fetchStarshipsByMovieId = async (movieId: string) => {
  try {
    const response = await api.get(`films/${movieId}`);
    return response.data.starships; // Assuming starships is an array of starship URLs
  } catch (error) {
    console.error(`Error fetching starships for movie with id ${movieId}:`, error);
    throw error;
  }
};
