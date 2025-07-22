import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
  },
}));

// Mock the Card component
jest.mock('../../ui/Card', () => {
  return function MockCard({ enableToggle }) {
    return <div data-testid="card" data-enable-toggle={enableToggle}>Mock Card</div>;
  };
});

describe('Hero Component', () => {
  beforeEach(() => {
    render(<Hero />);
  });

  test('renders hero section with correct id', () => {
    const heroSection = document.querySelector('#home');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveAttribute('id', 'home');
  });

  test('renders name text', () => {
    const nameTexts = screen.getAllByText('Yuvaan Vithlani');
    expect(nameTexts).toHaveLength(2); // One for mobile, one for desktop/tablet
    nameTexts.forEach(nameText => {
      expect(nameText).toBeInTheDocument();
      expect(nameText).toHaveClass('special-gothic-condensed-one-regular');
    });
  });

  test('renders DIGITAL heading', () => {
    const digitalHeadings = screen.getAllByText('DIGITAL');
    expect(digitalHeadings).toHaveLength(2); // One for mobile, one for desktop/tablet
    digitalHeadings.forEach(heading => {
      expect(heading).toHaveClass('special-gothic-condensed-one-regular');
    });
  });

  test('renders DESIGNER heading', () => {
    const designerHeadings = screen.getAllByText('DESIGNER');
    expect(designerHeadings).toHaveLength(2); // One for mobile, one for desktop/tablet
    designerHeadings.forEach(heading => {
      expect(heading).toHaveClass('special-gothic-condensed-one-regular');
    });
  });

  test('renders description text', () => {
    const descriptionTexts = screen.getAllByText("I'm a India-based digital designer and Framer developer");
    expect(descriptionTexts).toHaveLength(2); // One for mobile, one for desktop/tablet
    descriptionTexts.forEach(text => {
      expect(text).toHaveClass('font-inter-light');
    });
  });

  test('renders Card component with correct props', () => {
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2); // One for mobile, one for desktop/tablet
    cards.forEach(card => {
      expect(card).toHaveAttribute('data-enable-toggle', 'true');
    });
  });

  test('has correct responsive classes for mobile layout', () => {
    const mobileContainer = document.querySelector('.md\\:hidden');
    expect(mobileContainer).toHaveClass('md:hidden');
    expect(mobileContainer).toHaveClass('space-y-3');
  });

  test('has correct responsive classes for desktop/tablet layout', () => {
    const desktopContainer = document.querySelector('.hidden.md\\:block');
    expect(desktopContainer).toHaveClass('hidden', 'md:block');
  });

  test('applies correct font classes', () => {
    // Test Special Gothic Condensed font
    const nameElements = screen.getAllByText('Yuvaan Vithlani');
    nameElements.forEach(element => {
      expect(element).toHaveClass('special-gothic-condensed-one-regular');
    });

    // Test Inter Light font
    const descriptionElements = screen.getAllByText("I'm a India-based digital designer and Framer developer");
    descriptionElements.forEach(element => {
      expect(element).toHaveClass('font-inter-light');
    });
  });

  test('has correct positioning classes for desktop/tablet elements', () => {
    const digitalHeadings = screen.getAllByText('DIGITAL');
    const desktopDigital = digitalHeadings[1]; // Desktop version
    const parentDiv = desktopDigital.closest('.absolute');
    expect(parentDiv).toHaveClass('absolute');
    expect(parentDiv.className).toMatch(/top-\[45vh\]/);
    expect(parentDiv.className).toMatch(/left-\[8vw\]/);
  });

  test('mobile DIGITAL heading has correct negative margin', () => {
    const digitalHeadings = screen.getAllByText('DIGITAL');
    const mobileDigital = digitalHeadings[0]; // Mobile version
    expect(mobileDigital).toHaveClass('-mt-2');
  });
});