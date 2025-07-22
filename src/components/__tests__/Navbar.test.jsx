// src/components/__tests__/Navbar.test.jsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';

// Mock the Orb component to avoid ogl library issues
jest.mock('../../ui/orb', () => {
  return function MockOrb(props) {
    return <div data-testid="mock-orb" {...props}>Mock Orb</div>;
  };
});

// Mock window.scrollTo to prevent console errors
beforeAll(() => {
  Object.defineProperty(window, 'scrollTo', {
    value: jest.fn(),
    writable: true
  });
});

const mockMatchMedia = (isDesktop) => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: isDesktop ? query === '(min-width: 768px)' : query !== '(min-width: 768px)',
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

describe('Navbar Component', () => {
  test('renders logo and nav items on desktop', () => {
    mockMatchMedia(true);
    render(<Navbar />);
    
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    
    // Use getAllByText to handle multiple elements
    const homeElements = screen.getAllByText('Home');
    expect(homeElements.length).toBeGreaterThan(0);
    
    const contactElements = screen.getAllByText('Contact');
    expect(contactElements.length).toBeGreaterThan(0);
    
    // Check that mobile indicator exists in the right container
    const mobileIndicator = screen.getByText('Available for work');
    const mobileContainer = mobileIndicator.closest('.md\\:hidden');
    expect(mobileContainer).toBeInTheDocument();
  });

  test('renders mobile menu toggle and "Available for work" indicator initially', () => {
    mockMatchMedia(false);
    render(<Navbar />);
    
    expect(screen.getByText('Available for work')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('toggles mobile menu open and closed', async () => {
    mockMatchMedia(false);
    const user = userEvent.setup();
    render(<Navbar />);
    
    // Initial state: menu closed, indicator visible
    expect(screen.getByText('Available for work')).toBeInTheDocument();
    
    // Check that desktop About elements exist (they're always in DOM)
    const aboutElements = screen.getAllByText('About');
    expect(aboutElements.length).toBeGreaterThan(0);
    
    // Open menu
    await user.click(screen.getByRole('button'));
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Check that "Available for work" is hidden when menu is open
    expect(screen.queryByText('Available for work')).not.toBeInTheDocument();
    
    // Close menu by clicking the button again (toggle behavior)
    await user.click(screen.getByRole('button'));
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Check that "Available for work" is visible again
    expect(screen.getByText('Available for work')).toBeInTheDocument();
  });

  test('closes mobile menu when Contact is clicked', async () => {
    mockMatchMedia(false);
    const user = userEvent.setup();
    render(<Navbar />);
    
    // Open menu first
    await user.click(screen.getByRole('button'));
    
    // Wait for menu to open
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Find all Contact elements
    const contactElements = screen.getAllByText('Contact');
    
    // Select the mobile one
    const mobileContact = contactElements.find(el => el.closest('.md\\:hidden'));
    
    // Prevent default navigation behavior for testing
    mobileContact.addEventListener('click', e => e.preventDefault());
    
    // Click the mobile Contact
    await user.click(mobileContact);
    
    // Wait for animation and state update
    await new Promise(resolve => setTimeout(resolve, 150));
    
    // Menu should be closed - "Available for work" should be visible again
    await expect(screen.findByText('Available for work')).resolves.toBeInTheDocument();
  });
});