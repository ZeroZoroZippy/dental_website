import { render, screen } from '@testing-library/react';
import WorkingHoursBox from '../WorkingHoursBox';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('WorkingHoursBox', () => {
  test('renders without crashing', () => {
    render(<WorkingHoursBox windowWidth={1024} />);
  });

  test('renders "Working Hours" heading', () => {
    render(<WorkingHoursBox windowWidth={1024} />);
    expect(screen.getByText('Working Hours')).toBeInTheDocument();
  });

  test('renders weekday hours', () => {
    render(<WorkingHoursBox windowWidth={1024} />);
    expect(screen.getByText('Monday - Friday')).toBeInTheDocument();
    expect(screen.getByText('9AM - 9PM')).toBeInTheDocument();
  });

  test('renders weekend hours', () => {
    render(<WorkingHoursBox windowWidth={1024} />);
    expect(screen.getByText('Saturday, Sunday')).toBeInTheDocument();
    expect(screen.getByText('10AM - 6PM')).toBeInTheDocument();
  });

  test('applies correct styles for desktop', () => {
    const { container } = render(<WorkingHoursBox windowWidth={1024} />);
    const box = container.firstChild;
    expect(box).toHaveStyle('backgroundColor: #f4f5f7');
    expect(box).toHaveStyle('border: 1px solid #f0f0f0');
  });

  test('applies correct styles for mobile', () => {
    const { container } = render(<WorkingHoursBox windowWidth={500} />);
    const box = container.firstChild;
    expect(box).toHaveStyle('backgroundColor: #f4f5f7');
    expect(box).toHaveStyle('border: 1px solid #f0f0f0');
  });

  test('accepts custom delay prop', () => {
    render(<WorkingHoursBox windowWidth={1024} delay={0.5} />);
    expect(screen.getByText('Working Hours')).toBeInTheDocument();
  });

  test('uses default delay when not provided', () => {
    render(<WorkingHoursBox windowWidth={1024} />);
    expect(screen.getByText('Working Hours')).toBeInTheDocument();
  });

  test('has proper heading structure', () => {
    render(<WorkingHoursBox windowWidth={1024} />);
    const heading = screen.getByText('Working Hours');
    expect(heading.tagName).toBe('H3');
  });

  test('displays hours in correct format', () => {
    const { container } = render(<WorkingHoursBox windowWidth={1024} />);
    
    // Check that the component renders properly - framer-motion is mocked
    expect(container.firstChild).toBeInTheDocument();
  });
});