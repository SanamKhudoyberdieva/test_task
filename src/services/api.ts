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
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
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