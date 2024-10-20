import { render } from '@testing-library/react';
import Graph from '../components/Graph';

describe('Graph', () => {
  const mockHero = { id: 1, name: 'Luke Skywalker' };
  const mockMovies = [{ title: 'A New Hope' }];
  const mockStarships = [{ id: 1, name: 'X-wing' }];

  it('renders graph with hero, movies, and starships', () => {
    const { container } = render(<Graph hero={mockHero} movies={mockMovies} starships={mockStarships} />);

    expect(container).toBeInTheDocument();
  });
});
