import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
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

  it('renders heroes and shows loading state initially', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<HeroesList />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();

    const loadMoreButton = screen.queryByRole('button', { name: /load more/i });
    expect(loadMoreButton).not.toBeInTheDocument();
  });
});