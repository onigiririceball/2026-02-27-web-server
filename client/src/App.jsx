import { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import SearchBox from './components/SearchBox';

function App() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = async (searchQuery = '') => {
    const url = searchQuery
      ? `/api/users?query=${encodeURIComponent(searchQuery)}`
      : '/api/users';
    const res = await fetch(url);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (name, age) => {
    if (!name || !age) {
      setError('name と age は両方入力してください');
      return;
    }
    setError('');
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age }),
    });
    if (res.ok) {
      await fetchUsers(query);
    }
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    fetchUsers(searchQuery);
  };

  return (
    <div>
      <UserForm onSubmit={handleAddUser} error={error} />
      <SearchBox onSearch={handleSearch} />
      <UserList users={users} query={query} />
    </div>
  );
}

export default App;