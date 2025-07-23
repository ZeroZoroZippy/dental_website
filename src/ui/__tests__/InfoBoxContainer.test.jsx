import { render, screen } from '@testing-library/react';
import InfoBoxContainer from '../InfoBoxContainer';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

// Mock child components
jest.mock('../BookAppointmentBox', () => {
  return function MockBookAppointmentBox({ windowWidth, delay }) {
    return <div data-testid="book-appointment-box">Book Appointment Box - Width: {windowWidth}, Delay: {delay}</div>;
  };
});

jest.mock('../WorkingHoursBox', () => {
  return function MockWorkingHoursBox({ windowWidth, delay }) {
    return <div data-testid="working-hours-box">Working Hours Box - Width: {windowWidth}, Delay: {delay}</div>;
  };
});

jest.mock('../OpenNowBox', () => {
  return function MockOpenNowBox({ windowWidth, delay }) {
    return <div data-testid="open-now-box">Open Now Box - Width: {windowWidth}, Delay: {delay}</div>;
  };
});

describe('InfoBoxContainer', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  test('renders without crashing', () => {
    render(<InfoBoxContainer />);
  });

  test('renders all child components on desktop', () => {
    render(<InfoBoxContainer />);
    expect(screen.getByTestId('book-appointment-box')).toBeInTheDocument();
    expect(screen.getByTestId('working-hours-box')).toBeInTheDocument();
    expect(screen.getByTestId('open-now-box')).toBeInTheDocument();
  });

  test('renders all child components on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    render(<InfoBoxContainer />);
    expect(screen.getByTestId('book-appointment-box')).toBeInTheDocument();
    expect(screen.getByTestId('working-hours-box')).toBeInTheDocument();
    expect(screen.getByTestId('open-now-box')).toBeInTheDocument();
  });

  test('passes correct windowWidth prop to child components', () => {
    render(<InfoBoxContainer />);
    expect(screen.getAllByText(/Width: 1024/).length).toBeGreaterThan(0);
  });

  test('passes correct delay props to child components', () => {
    render(<InfoBoxContainer />);
    expect(screen.getByText(/Delay: 0.8/)).toBeInTheDocument(); // WorkingHoursBox
    expect(screen.getByText(/Delay: 1/)).toBeInTheDocument(); // OpenNowBox
    expect(screen.getByText(/Delay: 0.9/)).toBeInTheDocument(); // BookAppointmentBox
  });
});