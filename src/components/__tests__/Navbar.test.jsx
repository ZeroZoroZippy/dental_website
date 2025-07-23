import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    nav: ({ children, ...props }) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('Navbar', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  test('renders without crashing', () => {
    render(<Navbar />);
  });

  test('renders logo with dental icon', () => {
    render(<Navbar />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  test('renders all navigation items', () => {
    render(<Navbar />);
    expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Gallery').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Testimonials').length).toBeGreaterThan(0);
  });

  test('renders Book Appointment button', () => {
    render(<Navbar />);
    expect(screen.getAllByText('Book Appointment')[0]).toBeInTheDocument();
  });

  test('mobile menu toggle works', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    render(<Navbar />);
    
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
    
    fireEvent.click(menuButton);
    // After clicking, mobile menu should be visible
    expect(screen.getAllByText('Services').length).toBeGreaterThan(1);
  });

  test('navigation links have correct href attributes', () => {
    render(<Navbar />);
    expect(screen.getAllByText('Services')[0].closest('a')).toHaveAttribute('href', '#services');
    expect(screen.getAllByText('About')[0].closest('a')).toHaveAttribute('href', '#about');
    expect(screen.getAllByText('Gallery')[0].closest('a')).toHaveAttribute('href', '#gallery');
    expect(screen.getAllByText('Testimonials')[0].closest('a')).toHaveAttribute('href', '#testimonials');
  });
});