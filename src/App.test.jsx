import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders Navbar component', () => {
    render(<App />);
    // Check for navbar elements
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders Hero component', () => {
    render(<App />);
    // Check for hero section content
    expect(screen.getByText('Your Perfect Smile Starts here')).toBeInTheDocument();
  });

  test('has correct structure', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toHaveClass('App');
  });
});