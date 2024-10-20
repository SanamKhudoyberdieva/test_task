import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeroesList from '../pages/HeroList';
import { fetchHeroes } from '../api/getHeroes'; 
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock the API request
jest.mock('../services/api');

describe('HeroesList Component', () => {
  it('displays loading spinner on initial render', () => {
    render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading.../i)).toBeInTheDocument(); // Check if spinner is displayed
  });

  it('renders hero list and fetches data successfully', async () => {
    // Mock the API response
    (fetchHeroes as jest.Mock).mockResolvedValue({
      results: [
        { id: '1', name: 'Luke Skywalker', height: '172', mass: '77', films: [], starships: [] },
        { id: '2', name: 'Leia Organa', height: '150', mass: '49', films: [], starships: [] },
      ],
      next: null,
    });

    render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    // Initially, it shows the loading spinner
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    // Wait for the heroes to be rendered after the mock API call
    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/Leia Organa/i)).toBeInTheDocument();
    });
  });

  it('displays error message on API failure', async () => {
    // Mock the API failure
    (fetchHeroes as jest.Mock).mockRejectedValue(new Error('Failed to fetch heroes'));

    render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    // Wait for the error message to be displayed
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch heroes/i)).toBeInTheDocument();
    });
  });

  it('loads more heroes on "Load More" button click', async () => {
    // Mock the initial API response
    (fetchHeroes as jest.Mock).mockResolvedValue({
      results: [{ id: '1', name: 'Luke Skywalker', height: '172', mass: '77', films: [], starships: [] }],
      next: 'https://sw-api.starnavi.io/people/?page=2',
    });

    render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    // Wait for the first hero to load
    await waitFor(() => expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument());

    // Mock the next page response when "Load More" is clicked
    (fetchHeroes as jest.Mock).mockResolvedValueOnce({
      results: [{ id: '2', name: 'Leia Organa', height: '150', mass: '49', films: [], starships: [] }],
      next: null,
    });

    const loadMoreButton = screen.getByRole('button', { name: /load more heroes/i });
    expect(loadMoreButton).toBeInTheDocument();

    // Simulate clicking the "Load More" button
    userEvent.click(loadMoreButton);

    // Wait for the new hero (Leia) to be loaded
    await waitFor(() => expect(screen.getByText(/Leia Organa/i)).toBeInTheDocument());
  });
});
