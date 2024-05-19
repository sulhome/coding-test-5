import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  fetch.resetMocks();
});

describe('Anagram Checker App', () => {
  test('renders input field', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/enter a string/i);
    expect(inputElement).toBeInTheDocument();
  });

  test('shows no message or list when input is empty', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/enter a string/i);
    fireEvent.change(inputElement, { target: { value: '' } });
    const message = screen.queryByText(/no anagrams found/i);
    expect(message).toBeNull();
  });

  test('shows no anagrams message for input "asdfghjk"', async () => {
    fetch.mockResponseOnce(JSON.stringify({ best: [] }));

    render(<App />);
    const inputElement = screen.getByPlaceholderText(/enter a string/i);
    fireEvent.change(inputElement, { target: { value: 'asdfghjk' } });

    await waitFor(() => expect(screen.getByText(/no anagrams found/i)).toBeInTheDocument());
  });

  test('shows a list of anagrams for input "steak"', async () => {
    fetch.mockResponseOnce(JSON.stringify({ best: ["Keats", "skate", "Skeat", "stake", "steak", "takes", "teaks"] }));

    render(<App />);
    const inputElement = screen.getByPlaceholderText(/enter a string/i);
    fireEvent.change(inputElement, { target: { value: 'steak' } });

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(7);
      const expectedAnagrams = ["Keats", "skate", "Skeat", "stake", "steak", "takes", "teaks"];
      listItems.forEach((item, index) => {
        expect(item).toHaveTextContent(expectedAnagrams[index]);
      });
    });
  });

  test('shows a list of anagrams for input "eeenginr"', async () => {
    fetch.mockResponseOnce(JSON.stringify({ best: ["engineer", "re-engine"] }));

    render(<App />);
    const inputElement = screen.getByPlaceholderText(/enter a string/i);
    fireEvent.change(inputElement, { target: { value: 'eeenginr' } });

    await waitFor(() => {
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
      const expectedAnagrams = ["engineer", "re-engine"];
      listItems.forEach((item, index) => {
        expect(item).toHaveTextContent(expectedAnagrams[index]);
      });
    });
  });
});
