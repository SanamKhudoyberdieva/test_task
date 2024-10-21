import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HeroDetail from '../pages/HeroDetails';
import { fetchHeroById } from '../api/fetchHeroById'; 

jest.mock('../api/fetchHeroById'); 

describe('HeroDetail', () => {
  beforeEach(() => {
    (fetchHeroById as jest.Mock).mockResolvedValueOnce({
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      birth_year: '19BBY',
      gender: 'male',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
    });
  });

  it('renders hero details and graph after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/hero/1']}>
        <Routes>
          <Route path="/hero/:id" element={<HeroDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    expect(await screen.findByRole('heading', { name: /Luke Skywalker/i })).toBeInTheDocument();
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('X-wing')).toBeInTheDocument();
  });
});