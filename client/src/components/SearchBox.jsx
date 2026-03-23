import { useState } from 'react';

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => onSearch(query)}>検索</button>
    </div>
  );
}

export default SearchBox;