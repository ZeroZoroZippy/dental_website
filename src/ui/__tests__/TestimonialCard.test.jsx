import { render, screen } from '@testing-library/react';
import TestimonialCard from '../TestimonialCard';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, initial, animate, transition, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('TestimonialCard', () => {
  const defaultProps = {
    windowWidth: 1024,
    name: 'John Doe',
    location: 'Test Patient',
    rating: 5,
    text: 'Great service and friendly staff!',
    treatment: 'Preventive Care',
    delay: 1.2
  };

  it('renders testimonial content correctly', () => {
    render(<TestimonialCard {...defaultProps} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Test Patient')).toBeInTheDocument();
    expect(screen.getByText('"Great service and friendly staff!"')).toBeInTheDocument();
    expect(screen.getByText('Preventive Care')).toBeInTheDocument();
  });

  it('renders correct number of stars', () => {
    const { container } = render(<TestimonialCard {...defaultProps} rating={4} />);
    
    // Should have 5 star SVG elements total
    const stars = container.querySelectorAll('svg');
    expect(stars).toHaveLength(5);
  });

  it('handles mobile width correctly', () => {
    render(<TestimonialCard {...defaultProps} windowWidth={500} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});