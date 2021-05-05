import React, { VFC, useState, useEffect } from 'react';
import axios from 'axios';

import { User, Search } from './components';

export interface UserType {
  id: number,
  name: string,
  username: string
}

interface AppState {
  loading: boolean,
  error: string | null,
  data: UserType[]
}

const App: VFC = () => {
  const [users, setUsers] = useState<AppState>({
    loading: false,
    error: null,
    data: []
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    setUsers(prevState => ({ ...prevState, loading: true }));
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(({ data }) => {
        setUsers(prevState => ({ ...prevState, data }));
      })
      .catch((err) => setUsers(prevState => ({ ...prevState, error: err.message })))
      .finally(() => setUsers(prevState => ({ ...prevState, loading: false })));
  }, []);

  const getFilteredUsers = (): UserType[] =>
    users.data.filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <main>
      <h1>Users list</h1>
      <Search value={search} setValue={setSearch} />
      {users.loading && !users.error && <h2>Loading...</h2>}
      {!users.loading && !users.error && (
        <ol>
          {getFilteredUsers().map((user) => (
            <User key={user.id} user={user} />
          ))}
        </ol>
      )}
      {!users.loading && !users.error && !getFilteredUsers().length && (
        <h2>No users found!</h2>
      )}
      {!users.loading && users.error && (
        <h2 className="error" aria-label="error">{users.error}</h2>
      )}
    </main>
  );
};

export default App;
