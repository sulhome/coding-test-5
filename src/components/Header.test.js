import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
    test('renders header with correct text', () => {
        const { getByText } = render(<Header />);
        const headerElement = getByText(/Anagram Checker/i);
        expect(headerElement).toBeInTheDocument();
    });
});
