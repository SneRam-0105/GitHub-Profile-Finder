import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="loader-container" role="status" aria-label="Loading profile">
      <div className="spinner" aria-hidden="true">
        <div className="spinner-ring" />
        <div className="spinner-ring" />
        <div className="spinner-ring" />
        <div className="spinner-ring" />
      </div>
      <p className="loader-text">Fetching profile…</p>
    </div>
  );
};

export default Loader;
