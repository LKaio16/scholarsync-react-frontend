import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ element }) => {
  const { token, user } = useAuth();

  if (token && user) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PublicRoute;
