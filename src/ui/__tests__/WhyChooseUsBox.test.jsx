import { render, screen } from '@testing-library/react';
import WhyChooseUsBox from '../WhyChooseUsBox';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('WhyChooseUsBox', () => {
  test('renders without crashing', () => {
    render(<WhyChooseUsBox windowWidth={1024} />);
  });

  test('renders "Why Choose Us" text', () => {
    render(<WhyChooseUsBox windowWidth={1024} />);
    expect(screen.getByText('Why Choose Us')).toBeInTheDocument();
  });

  test('applies mobile styles when windowWidth is less than 768px', () => {
    const { container } = render(<WhyChooseUsBox windowWidth={500} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('Why Choose Us')).toBeInTheDocument();
  });

  test('applies desktop styles when windowWidth is 768px or more', () => {
    const { container } = render(<WhyChooseUsBox windowWidth={1024} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(screen.getByText('Why Choose Us')).toBeInTheDocument();
  });

  test('renders as a positioned element', () => {
    const { container } = render(<WhyChooseUsBox windowWidth={1024} />);
    const element = container.firstChild;
    expect(element).toBeInTheDocument();
  });
});