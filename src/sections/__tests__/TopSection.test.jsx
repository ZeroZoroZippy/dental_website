import { render, screen } from '@testing-library/react';
import TopSection from '../TopSection';

// Mock the Hero component
jest.mock('../Hero', () => {
  return function MockHero() {
    return <div data-testid="hero-component">Mock Hero Component</div>;
  };
});

describe('TopSection Component', () => {
  beforeEach(() => {
    render(<TopSection />);
  });

  test('renders TopSection component', () => {
    const topSection = screen.getByTestId('hero-component');
    expect(topSection).toBeInTheDocument();
  });

  test('renders Hero component', () => {
    const heroComponent = screen.getByTestId('hero-component');
    expect(heroComponent).toBeInTheDocument();
    expect(heroComponent).toHaveTextContent('Mock Hero Component');
  });

  test('renders services section placeholder', () => {
    const servicesSection = document.querySelector('#services');
    expect(servicesSection).toBeInTheDocument();
    expect(servicesSection).toHaveAttribute('id', 'services');
    expect(servicesSection).toHaveClass('relative', 'h-screen');
  });

  test('has correct structure with relative positioning', () => {
    const container = screen.getByTestId('hero-component').parentElement;
    expect(container).toHaveClass('relative');
  });

  test('services section has correct styling classes', () => {
    const servicesSection = document.querySelector('#services');
    expect(servicesSection).toHaveClass(
      'relative',
      'h-screen',
      'flex',
      'items-center',
      'justify-center',
      'bg-gradient-to-b',
      'from-transparent',
      'to-black/20'
    );
  });

  test('services section has correct container structure', () => {
    const servicesSection = document.querySelector('#services');
    const container = servicesSection.querySelector('.container');
    expect(container).toHaveClass('container', 'mx-auto', 'px-4', 'text-center');
    
    const innerContainer = container.querySelector('.max-w-4xl');
    expect(innerContainer).toHaveClass('max-w-4xl', 'mx-auto');
  });
});