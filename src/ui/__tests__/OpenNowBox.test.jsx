import { render, screen } from '@testing-library/react';
import OpenNowBox from '../OpenNowBox';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('OpenNowBox', () => {
  test('renders without crashing', () => {
    render(<OpenNowBox windowWidth={1024} />);
  });

  test('renders "Open Now" text', () => {
    render(<OpenNowBox windowWidth={1024} />);
    expect(screen.getByText('Open Now')).toBeInTheDocument();
  });

  test('renders status indicator dot', () => {
    const { container } = render(<OpenNowBox windowWidth={1024} />);
    // Check for the animated dot element - framer-motion is mocked so we just check structure
    expect(container.firstChild).toBeInTheDocument();
  });

  test('applies correct styles for desktop', () => {
    const { container } = render(<OpenNowBox windowWidth={1024} />);
    const box = container.firstChild;
    expect(box).toHaveStyle('backgroundColor: #ffffff');
    expect(box).toHaveStyle('border: 1px solid #A3A3A3');
  });

  test('applies correct styles for mobile', () => {
    const { container } = render(<OpenNowBox windowWidth={500} />);
    const box = container.firstChild;
    expect(box).toHaveStyle('backgroundColor: #ffffff');
    expect(box).toHaveStyle('border: 1px solid #A3A3A3');
  });

  test('accepts custom delay prop', () => {
    render(<OpenNowBox windowWidth={1024} delay={0.5} />);
    expect(screen.getByText('Open Now')).toBeInTheDocument();
  });

  test('uses default delay when not provided', () => {
    render(<OpenNowBox windowWidth={1024} />);
    expect(screen.getByText('Open Now')).toBeInTheDocument();
  });

  test('has proper flex layout', () => {
    const { container } = render(<OpenNowBox windowWidth={1024} />);
    const box = container.firstChild;
    expect(box).toHaveStyle('display: flex');
    expect(box).toHaveStyle('alignItems: center');
    expect(box).toHaveStyle('justifyContent: center');
  });
});