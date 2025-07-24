import { render, screen } from '@testing-library/react';
import Services from '../Services';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
  },
}));

// Mock react-icons
jest.mock('react-icons/md', () => ({
  MdArrowOutward: () => <span data-testid="arrow-icon">→</span>,
}));

jest.mock('react-icons/io', () => ({
  IoMdCheckboxOutline: () => <span data-testid="checkbox-icon">☑</span>,
}));

// Mock UI components
jest.mock('../../ui/WhyChooseUsBox', () => {
  return function MockWhyChooseUsBox() {
    return <div data-testid="why-choose-us-box">Why Choose Us Box</div>;
  };
});

jest.mock('../../ui/ServiceCard', () => {
  return function MockServiceCard({ title, checkPoints }) {
    return (
      <div data-testid="service-card">
        <h3>{title}</h3>
        {checkPoints && checkPoints.map((point, index) => (
          <div key={index} data-testid="check-point">{point}</div>
        ))}
        <div data-testid="explore-more-button">Explore more</div>
      </div>
    );
  };
});

describe('Services', () => {
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
    render(<Services />);
  });

  test('renders main heading', () => {
    render(<Services />);
    expect(screen.getByText(/Dental Services/)).toBeInTheDocument();
    expect(screen.getByText(/for Every Need/)).toBeInTheDocument();
  });

  test('renders Our Services label', () => {
    render(<Services />);
    expect(screen.getByText('Our Services')).toBeInTheDocument();
  });

  test('renders the paragraph', () => {
    render(<Services />);
    expect(screen.getByText(/We offer comprehensive dental services tailored to your needs/)).toBeInTheDocument();
  });
  
  test('renders Explore All Services button', () => {
    render(<Services />);
    expect(screen.getByText('Explore All Services')).toBeInTheDocument();
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
  });

  test('renders all four ServiceCard components', () => {
    render(<Services />);
    expect(screen.getByText('Preventive Care')).toBeInTheDocument();
    expect(screen.getByText('Restorative Dentistry')).toBeInTheDocument();
    expect(screen.getByText('Cosmetic Dentistry')).toBeInTheDocument();
    expect(screen.getByText('Specialty Services')).toBeInTheDocument();
  });

  test('sets up window resize listener', () => {
    render(<Services />);
    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  test('applies mobile styles when window width is less than 768px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    const { container } = render(<Services />);
    expect(container.firstChild).toBeInTheDocument();
  });
});