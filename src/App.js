import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import InputField from './components/InputField';
import AnagramList from './components/AnagramList';
import useAnagrams from "./hooks/useAnagrams";

function App() {
    const [input, setInput] = useState('');
    const { anagrams, loading } = useAnagrams(input);

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <div className="App">
            <Header />
            <InputField value={input} onChange={handleChange} />
            {loading ? <p>Loading...</p> : <AnagramList input={input} anagrams={anagrams} />}
        </div>
    );
}

export default App;
