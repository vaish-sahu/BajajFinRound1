import  { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);
  const [filteredData, setFilteredData] = useState({});

  const backendUrl = 'http://localhost:3000/bfhl'; 

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      setError('');
      const res = await axios.post(backendUrl, parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input:' , err);
    }
  };

  const handleFilterChange = (event) => {
    const options = [...event.target.options]
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFilter(options);

    const filtered = {};
    if (response) {
      if (options.includes('Numbers')) filtered.numbers = response.numbers;
      if (options.includes('Alphabets')) filtered.alphabets = response.alphabets;
      if (options.includes('Highest Lowercase Alphabet'))
        filtered.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    }
    setFilteredData(filtered);
  };

  return (
    <div className="App">
      <h1>Bajaj Finserv Health Dev Challenge</h1>
      <textarea
        placeholder="Enter JSON here"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <h2>Response</h2>
          <select multiple onChange={handleFilterChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</option>
          </select>
          <div className="response">
            {filter.includes('Numbers') && <p>Numbers: {filteredData.numbers?.join(', ')}</p>}
            {filter.includes('Alphabets') && <p>Alphabets: {filteredData.alphabets?.join(', ')}</p>}
            {filter.includes('Highest Lowercase Alphabet') && (
              <p>Highest Lowercase Alphabet: {filteredData.highest_lowercase_alphabet?.join(', ')}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;