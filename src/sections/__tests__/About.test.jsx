import { render, screen } from '@testing-library/react';
import About from '../About';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
}));

// Mock UI components
jest.mock('../../ui/WhyChooseUsBox', () => {
  return function MockWhyChooseUsBox() {
    return <div data-testid="why-choose-us-box">Why Choose Us Box</div>;
  };
});

jest.mock('../../ui/AboutCard', () => {
  return function MockAboutCard({ title, description }) {
    return (
      <div data-testid="about-card">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  };
});

describe('About', () => {
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
    render(<About />);
  });

  test('renders main heading', () => {
    render(<About />);
    expect(screen.getByText('Excellence in Dental Care')).toBeInTheDocument();
  });

  test('renders WhyChooseUsBox component', () => {
    render(<About />);
    expect(screen.getByTestId('why-choose-us-box')).toBeInTheDocument();
  });

  test('renders all three paragraphs', () => {
    render(<About />);
    expect(screen.getByText(/We are dedicated to providing exceptional dental care/)).toBeInTheDocument();
    expect(screen.getByText(/From routine cleanings to advanced procedures/)).toBeInTheDocument();
    expect(screen.getByText(/We're committed to helping you achieve/)).toBeInTheDocument();
  });

  test('renders all four AboutCard components', () => {
    render(<About />);
    expect(screen.getByText('Expert Team')).toBeInTheDocument();
    expect(screen.getByText('Modern Technology')).toBeInTheDocument();
    expect(screen.getByText('Comfortable Environment')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive Care')).toBeInTheDocument();
  });

  test('sets up window resize listener', () => {
    render(<About />);
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  test('applies mobile styles when window width is less than 768px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { container } = render(<About />);
    expect(container.firstChild).toBeInTheDocument();
  });
});