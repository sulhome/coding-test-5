import React from 'react';
import { render } from '@testing-library/react';
import AnagramList from './AnagramList';

describe('AnagramList Component', () => {
    test('renders no message or list when input is empty', () => {
        const { container } = render(<AnagramList input="" anagrams={[]} />);
        expect(container).toBeEmptyDOMElement();
    });

    test('renders "No anagrams found" message when no anagrams are found', () => {
        const { getByText } = render(<AnagramList input="test" anagrams={[]} />);
        const messageElement = getByText(/No anagrams found/i);
        expect(messageElement).toBeInTheDocument();
    });

    test('renders list of anagrams when anagrams are found', () => {
        const anagrams = ["test", "sett"];
        const { getAllByRole } = render(<AnagramList input="test" anagrams={anagrams} />);
        const listItems = getAllByRole('listitem');
        expect(listItems).toHaveLength(anagrams.length);
        listItems.forEach((item, index) => {
            expect(item).toHaveTextContent(anagrams[index]);
        });
    });
});
