import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user ? user.name : 'Guest'}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
