import { useState } from 'react';

function UserForm({ onSubmit, error }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={() => onSubmit(name, age)}>送信</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UserForm;