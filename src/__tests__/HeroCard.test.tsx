import { render, screen } from '@testing-library/react';
import HeroCard from '../components/HeroCard';

describe('HeroCard', () => {
  const mockProps = {
    id: '1',
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    onClick: jest.fn(),
  };

  it('renders correctly with given props', () => {
    render(<HeroCard {...mockProps} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText(/Height: 172/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
  });

  it('calls onClick function when clicked', () => {
    render(<HeroCard {...mockProps} />);
    
    screen.getByRole('button').click();
    expect(mockProps.onClick).toHaveBeenCalled();
  });
});
