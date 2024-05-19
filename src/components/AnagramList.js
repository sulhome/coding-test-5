import React from 'react';

const AnagramList = ({ input, anagrams }) => {
    if (!input) return null;

    return (
        <div>
            {anagrams.length > 0 ? (
                <ul>
                    {anagrams.map((word, index) => (
                        <li key={index}>{word}</li>
                    ))}
                </ul>
            ) : (
                <p>No anagrams found</p>
            )}
        </div>
    );
};

export default AnagramList;
