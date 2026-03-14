import React, { useState } from 'react';
import './App.css';

import SearchBar    from './components/SearchBar';
import ProfileCard  from './components/ProfileCard';
import RepoList     from './components/RepoList';
import Loader       from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

import { useGitHub } from './hooks/useGitHub';

const App: React.FC = () => {
  const [searchedUsername, setSearchedUsername] = useState<string>('');

  const { user, repos, loading, error } = useGitHub(searchedUsername);

  const handleSearch = (username: string) => {
    setSearchedUsername(username);
  };

  const showWelcome  = !searchedUsername && !loading;
  const showLoader   = loading;
  const showError    = !loading && error !== null;
  const showResults  = !loading && !error && user !== null;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="brand">
            <svg
              className="brand-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="brand-name">GitHub Profile Finder</span>
          </div>
          <p className="brand-subtitle">
            Search any GitHub user to explore their profile and top repositories
          </p>
        </div>

        <SearchBar onSearch={handleSearch} loading={loading} />
      </header>

      <main className="app-main">
        {showWelcome && (
          <div className="welcome-state">
            <svg
              className="welcome-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h2 className="welcome-title">Find a GitHub Profile</h2>
            <p className="welcome-text">
              Type a GitHub username above and press <kbd>Enter</kbd> or click{' '}
              <strong>Search</strong> to explore their profile and repositories.
            </p>
            <div className="welcome-examples">
              <span className="examples-label">Try:</span>
              {['torvalds', 'gaearon', 'sindresorhus', 'tj'].map((name) => (
                <button
                  key={name}
                  className="example-chip"
                  onClick={() => handleSearch(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {showLoader && <Loader />}

        {showError && <ErrorMessage message={error!} />}

        {showResults && (
          <div className="results">
            <ProfileCard user={user!} />
            <RepoList repos={repos} username={user!.login} />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          Built with React + TypeScript &bull; Powered by the{' '}
          <a
            href="https://docs.github.com/en/rest"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub REST API
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
