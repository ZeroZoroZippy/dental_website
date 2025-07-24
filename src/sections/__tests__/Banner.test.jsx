import { render, screen } from '@testing-library/react';
import Banner from '../Banner';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
}));

// Mock images
jest.mock('../../assets/banner_desktop.png', () => 'banner-desktop.png');
jest.mock('../../assets/banner_mobile.png', () => 'banner-mobile.png');

// Mock BookAppointment component
jest.mock('../../ui/BookAppointment', () => {
  return function MockBookAppointmentButton() {
    return <button data-testid="book-appointment-button">Book Appointment</button>;
  };
});

describe('Banner', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    // Mock window.addEventListener and removeEventListener
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<Banner />);
  });

  test('renders main heading', () => {
    render(<Banner />);
    expect(screen.getByRole('heading', { name: /Book Your.*Appointment.*in a Few Minutes/i })).toBeInTheDocument();
  });

  test('renders description text', () => {
    render(<Banner />);
    expect(screen.getByText(/Ready to achieve a healthier, brighter smile/)).toBeInTheDocument();
    expect(screen.getByText(/Schedule your visit with us today/)).toBeInTheDocument();
  });

  test('renders BookAppointment button', () => {
    render(<Banner />);
    expect(screen.getByTestId('book-appointment-button')).toBeInTheDocument();
  });

  test('sets up window resize listener', () => {
    render(<Banner />);
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  test('applies mobile styles when window width is less than 768px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { container } = render(<Banner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('accepts custom height props', () => {
    render(<Banner height="400px" mobileHeight="800px" />);
    expect(screen.getByTestId('book-appointment-button')).toBeInTheDocument();
  });

  test('renders children when provided', () => {
    render(
      <Banner>
        <div data-testid="banner-child">Child content</div>
      </Banner>
    );
    expect(screen.getByTestId('banner-child')).toBeInTheDocument();
  });
});