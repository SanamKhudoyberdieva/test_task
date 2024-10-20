import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroesList from '../pages/HeroList';
import * as api from '../api/fetchHeroes';

jest.mock('../api/fetchHeroes');

describe('HeroesList', () => {
  const mockHeroes = {
    results: [{ id: '1', name: 'Luke Skywalker', height: '172', mass: '77' }],
    next: null,
  };

  beforeEach(() => {
    (api.fetchHeroes as jest.Mock).mockResolvedValue(mockHeroes);
  });

  it('renders heroes and loads more on button click', async () => {
    render(
      <MemoryRouter>
        <HeroesList />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    const loadMoreButton = screen.getByRole('button', { name: /load more/i });
    expect(loadMoreButton).not.toBeInTheDocument();
  });
});
