import { render, screen, fireEvent } from '@testing-library/react';
import HeroCard from '../components/HeroCard';

describe('HeroCard', () => {
  const mockProps = {
    id: '1',
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    render(<HeroCard {...mockProps} />);

    const button = screen.getByRole('button', {
      name: /view details for luke skywalker/i, 
    });
    expect(button).toBeInTheDocument();

    expect(screen.getByText(mockProps.name)).toBeInTheDocument();

    expect(screen.getByText(/Height:/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass:/i)).toBeInTheDocument();
    
    expect(screen.getByText(/172/i)).toBeInTheDocument();
    expect(screen.getByText(/77/i)).toBeInTheDocument();
  });

  it('calls onClick function when clicked', () => {
    render(<HeroCard {...mockProps} />);

    fireEvent.click(screen.getByRole('button', { name: /view details for luke skywalker/i }));
    
    expect(mockProps.onClick).toHaveBeenCalled();
  });
});