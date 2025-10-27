import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders the main application component', () => {
    render(<App />);
    // Example assertion: check if a key element is rendered
    // This will likely fail and need adjustment based on your actual App component
    expect(screen.getByText(/OpenKey/i)).toBeInTheDocument();
  });
});
