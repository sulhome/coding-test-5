import { useState, useEffect } from 'react';

const useAnagrams = (input) => {
    const [anagrams, setAnagrams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!input) {
            setAnagrams([]);
            return;
        }

        const fetchAnagrams = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://thingproxy.freeboard.io/fetch/http://www.anagramica.com/best/${input}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAnagrams(data.best);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnagrams();
    }, [input]);

    return { anagrams, loading, error };
};

export default useAnagrams;
