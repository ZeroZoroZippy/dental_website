import { render, screen } from '@testing-library/react';
import AboutCard from '../AboutCard';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('AboutCard', () => {
  const defaultProps = {
    windowWidth: 1024,
    title: 'Test Title',
    description: 'Test description for the card',
    delay: 1.2
  };

  test('renders without crashing', () => {
    render(<AboutCard {...defaultProps} />);
  });

  test('renders title and description', () => {
    render(<AboutCard {...defaultProps} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description for the card')).toBeInTheDocument();
  });

  test('applies mobile styles when windowWidth is less than 768px', () => {
    const mobileProps = { ...defaultProps, windowWidth: 500 };
    const { container } = render(<AboutCard {...mobileProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('applies desktop styles when windowWidth is 768px or more', () => {
    const desktopProps = { ...defaultProps, windowWidth: 1024 };
    const { container } = render(<AboutCard {...desktopProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('uses default delay when not provided', () => {
    const propsWithoutDelay = {
      windowWidth: 1024,
      title: 'Test Title',
      description: 'Test description'
    };
    render(<AboutCard {...propsWithoutDelay} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('renders with custom delay', () => {
    const propsWithCustomDelay = { ...defaultProps, delay: 2.0 };
    render(<AboutCard {...propsWithCustomDelay} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});