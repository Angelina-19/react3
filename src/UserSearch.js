import React, { useState } from 'react';

function UserSearch() {
  const [id, setId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setId(e.target.value);
    setError('');
    setUser(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!id) {
      setError('Введіть ID користувача');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      if (!res.ok) throw new Error('Користувача не знайдено');
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          ID користувача:
          <input
            type="number"
            value={id}
            onChange={handleChange}
            placeholder="Наприклад, 1"
          />
        </label>
        <button type="submit">Пошук</button>
      </form>

      {loading && <p>Завантаження…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>
            Адреса: {user.address.street}, {user.address.suite},{' '}
            {user.address.city}, {user.address.zipcode}
          </p>
        </div>
      )}
    </div>
  );
}

export default UserSearch;