import { render, screen } from '@testing-library/react';
import Testimonials from '../Testimonials';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
}));

// Mock TestimonialCard component
jest.mock('../../ui/TestimonialCard', () => {
  return function MockTestimonialCard({ name, treatment }) {
    return (
      <div data-testid="testimonial-card">
        <span>{name}</span>
        <span>{treatment}</span>
      </div>
    );
  };
});

describe('Testimonials', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('renders testimonials section with correct heading', () => {
    render(<Testimonials />);
    
    expect(screen.getByText(/What Our Patients/)).toBeInTheDocument();
    expect(screen.getByText(/Are Saying/)).toBeInTheDocument();
  });

  it('renders section badge', () => {
    render(<Testimonials />);
    
    expect(screen.getByText('Patient Reviews')).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Testimonials />);
    
    expect(screen.getByText(/Real experiences from real patients/)).toBeInTheDocument();
  });

  it('renders CTA button', () => {
    render(<Testimonials />);
    
    expect(screen.getByText('Read All Reviews')).toBeInTheDocument();
  });

  it('renders testimonial cards', () => {
    render(<Testimonials />);
    
    const testimonialCards = screen.getAllByTestId('testimonial-card');
    expect(testimonialCards.length).toBeGreaterThan(0);
  });

  it('has correct section id for navigation', () => {
    const { container } = render(<Testimonials />);
    
    expect(container.querySelector('#testimonials')).toBeInTheDocument();
  });
});