import { render, screen } from '@testing-library/react';
import BookAppointmentBox from '../BookAppointmentBox';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('BookAppointmentBox', () => {
  test('renders without crashing', () => {
    render(<BookAppointmentBox windowWidth={1024} />);
  });

  test('renders "Book an Appointment" text', () => {
    render(<BookAppointmentBox windowWidth={1024} />);
    expect(screen.getByText('Book an Appointment')).toBeInTheDocument();
  });

  test('renders arrow icon', () => {
    render(<BookAppointmentBox windowWidth={1024} />);
    expect(screen.getByText('↗')).toBeInTheDocument();
  });

  test('applies correct styles for desktop', () => {
    const { container } = render(<BookAppointmentBox windowWidth={1024} />);
    const box = container.firstChild;
    expect(box).toHaveStyle('backgroundColor: #a9eaf7');
    expect(box).toHaveStyle('cursor: pointer');
  });

  test('applies correct styles for mobile', () => {
    const { container } = render(<BookAppointmentBox windowWidth={500} />);
    const box = container.firstChild;
    expect(box).toHaveStyle('backgroundColor: #a9eaf7');
    expect(box).toHaveStyle('cursor: pointer');
  });

  test('accepts custom delay prop', () => {
    render(<BookAppointmentBox windowWidth={1024} delay={0.5} />);
    expect(screen.getByText('Book an Appointment')).toBeInTheDocument();
  });

  test('uses default delay when not provided', () => {
    render(<BookAppointmentBox windowWidth={1024} />);
    expect(screen.getByText('Book an Appointment')).toBeInTheDocument();
  });

  test('has proper heading structure', () => {
    render(<BookAppointmentBox windowWidth={1024} />);
    const heading = screen.getByText('Book an Appointment');
    expect(heading.tagName).toBe('H3');
  });
});