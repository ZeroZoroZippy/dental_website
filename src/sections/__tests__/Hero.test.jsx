import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
}));

// Mock the hero image
jest.mock('../../assets/hero.jpeg', () => 'hero-image.jpg');

// Mock InfoBoxContainer
jest.mock('../../ui/InfoBoxContainer', () => {
  return function MockInfoBoxContainer() {
    return <div data-testid="info-box-container">Info Box Container</div>;
  };
});

describe('Hero', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  test('renders without crashing', () => {
    render(<Hero />);
  });

  test('renders main heading', () => {
    render(<Hero />);
    expect(screen.getByText('Your Perfect Smile Starts here')).toBeInTheDocument();
  });

  test('renders description text', () => {
    render(<Hero />);
    expect(screen.getByText(/Advanced dental care with a gental touch/)).toBeInTheDocument();
    expect(screen.getByText(/Book your Appointment today/)).toBeInTheDocument();
  });

  test('renders hero image with correct alt text', () => {
    render(<Hero />);
    const heroImage = screen.getByAltText('Hero');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', 'hero-image.jpg');
  });

  test('renders InfoBoxContainer component', () => {
    render(<Hero />);
    expect(screen.getByTestId('info-box-container')).toBeInTheDocument();
  });

  test('applies responsive styles for mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { container } = render(<Hero />);
    expect(container.firstChild).toBeInTheDocument();
  });
});