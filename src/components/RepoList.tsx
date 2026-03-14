import React from 'react';
import { GitHubRepo } from '../types/github';

interface RepoListProps {
  repos: GitHubRepo[];
  username: string;
}

const getLanguageColor = (language: string | null): string => {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python:     '#3572A5',
    Rust:       '#dea584',
    Go:         '#00ADD8',
    Java:       '#b07219',
    'C++':      '#f34b7d',
    C:          '#555555',
    'C#':       '#178600',
    Ruby:       '#701516',
    PHP:        '#4F5D95',
    Swift:      '#ffac45',
    Kotlin:     '#A97BFF',
    Dart:       '#00B4AB',
    HTML:       '#e34c26',
    CSS:        '#563d7c',
    Shell:      '#89e051',
    Vue:        '#41b883',
    Svelte:     '#ff3e00',
  };
  return language ? (colors[language] ?? '#8b949e') : '#8b949e';
};

const RepoCard: React.FC<{ repo: GitHubRepo }> = ({ repo }) => (
  <a
    href={repo.html_url}
    target="_blank"
    rel="noopener noreferrer"
    className="repo-card"
    aria-label={`Open repository ${repo.name}`}
  >
    <h3 className="repo-name">{repo.name}</h3>

    <p className="repo-description">
      {repo.description ?? 'No description provided.'}
    </p>

    <div className="repo-footer">
      {repo.language && (
        <span className="repo-language">
          <span
            className="language-dot"
            style={{ backgroundColor: getLanguageColor(repo.language) }}
            aria-hidden="true"
          />
          {repo.language}
        </span>
      )}

      <span className="repo-stat" aria-label={`${repo.stargazers_count} stars`}>
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
        </svg>
        {repo.stargazers_count.toLocaleString()}
      </span>

      <span className="repo-stat" aria-label={`${repo.forks_count} forks`}>
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        {repo.forks_count.toLocaleString()}
      </span>
    </div>
  </a>
);

const RepoList: React.FC<RepoListProps> = ({ repos, username }) => {
  if (repos.length === 0) {
    return (
      <section className="repo-list-section">
        <h2 className="section-title">Top Repositories</h2>
        <p className="no-repos">This user has no public repositories.</p>
      </section>
    );
  }

  return (
    <section className="repo-list-section" aria-label="Top repositories">
      <div className="section-header">
        <h2 className="section-title">Top Repositories</h2>
        <a
          href={`https://github.com/${username}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="view-all-link"
        >
          View all repos &rarr;
        </a>
      </div>

      <div className="repo-grid">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
};

export default RepoList;
