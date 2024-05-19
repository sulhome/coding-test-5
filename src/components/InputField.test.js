import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputField from './InputField';

describe('InputField Component', () => {
    test('renders input field with correct placeholder', () => {
        const { getByPlaceholderText } = render(<InputField value="" onChange={() => {}} />);
        const inputElement = getByPlaceholderText(/Enter a string/i);
        expect(inputElement).toBeInTheDocument();
    });

    test('calls onChange when input value changes', () => {
        const handleChange = jest.fn();
        const { getByPlaceholderText } = render(<InputField value="" onChange={handleChange} />);
        const inputElement = getByPlaceholderText(/Enter a string/i);
        fireEvent.change(inputElement, { target: { value: 'test' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
