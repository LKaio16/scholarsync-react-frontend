import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-dot" />
        <div className="loading-dot" />
        <div className="loading-dot" />
      </div>
    </div>
  );
};

export default Loading;
