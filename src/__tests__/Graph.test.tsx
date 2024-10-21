import { render, screen } from '@testing-library/react';
import Graph from '../components/Graph';

describe('Graph', () => {
  const mockHero = { id: 1, name: 'Luke Skywalker' };

  const mockMovies = [{ id: 1, title: 'A New Hope' }];
  const mockStarships = [{ id: 1, name: 'X-wing' }];
            
  it('renders graph with hero, movies, and starships', () => {
    render(<Graph hero={mockHero} movies={mockMovies} starships={mockStarships} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('X-wing')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<Graph hero={mockHero} movies={mockMovies} starships={mockStarships} />);
    expect(asFragment()).toMatchSnapshot();
  });
});