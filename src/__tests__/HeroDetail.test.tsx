import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import HeroDetail from '../pages/HeroDetails';
import * as api from '../api/fetchHeroById';
import * as apiFilms from '../api/fetchFilmsByIds';
import * as apiStarships from '../api/fetchStarshipsByIds';

jest.mock('../api/fetchHeroById');
jest.mock('../api/fetchFilmsByIds');
jest.mock('../api/fetchStarshipsByIds');

describe('HeroDetail', () => {
  const mockHero = {
    id: '1',
    name: 'Luke Skywalker',
    films: ['1', '2'],
    starships: ['1', '2'],
  };

  const mockFilms = [{ title: 'A New Hope' }, { title: 'The Empire Strikes Back' }];
  const mockStarships = [{ id: '1', name: 'X-wing' }, { id: '2', name: 'TIE Fighter' }];

  beforeEach(() => {
    (api.fetchHeroById as jest.Mock).mockResolvedValue(mockHero);
    (apiFilms.fetchFilmsByIds as jest.Mock).mockResolvedValue(mockFilms);
    (apiStarships.fetchStarshipsByIds as jest.Mock).mockResolvedValue(mockStarships);
  });

  it('renders hero details and graph', async () => {
    render(
      <MemoryRouter initialEntries={['/hero/1']}>
        <Route path="/hero/:id">
          <HeroDetail />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.getByText('A New Hope')).toBeInTheDocument();
      expect(screen.getByText('X-wing')).toBeInTheDocument();
    });
  });
});
