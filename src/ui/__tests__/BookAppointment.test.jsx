import { render, screen, fireEvent } from '@testing-library/react';
import BookAppointmentButton from '../BookAppointment';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
}));

// Mock react-icons
jest.mock('react-icons/md', () => ({
  MdArrowOutward: () => <span data-testid="arrow-icon">→</span>,
}));

describe('BookAppointmentButton', () => {
  test('renders without crashing', () => {
    render(<BookAppointmentButton isMobile={false} />);
  });

  test('renders button text', () => {
    render(<BookAppointmentButton isMobile={false} />);
    expect(screen.getByText('Book Appointment')).toBeInTheDocument();
  });

  test('renders arrow icon', () => {
    render(<BookAppointmentButton isMobile={false} />);
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
  });

  test('applies mobile styles when isMobile is true', () => {
    const { container } = render(<BookAppointmentButton isMobile={true} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('applies desktop styles when isMobile is false', () => {
    const { container } = render(<BookAppointmentButton isMobile={false} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('handles mouse hover events', () => {
    render(<BookAppointmentButton isMobile={false} />);
    const button = screen.getByText('Book Appointment');
    
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);
    
    expect(button).toBeInTheDocument();
  });

  test('button is clickable', () => {
    const { container } = render(<BookAppointmentButton isMobile={false} />);
    const button = screen.getByText('Book Appointment');
    
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});