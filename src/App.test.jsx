
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { expect } from '@testing-library/jest-dom';
import { test } from '@jest/globals';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
