import React from 'react';
import { GitHubUser } from '../types/github';

interface ProfileCardProps {
  user: GitHubUser;
}

const formatNumber = (n: number): string => {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1)}k`;
  }
  return n.toString();
};

const formatDate = (isoString: string): string => {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
};

const ensureHttps = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <article className="profile-card" aria-label={`Profile of ${user.login}`}>
      <div className="profile-header">
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="avatar-link"
          aria-label={`Open ${user.login}'s GitHub profile`}
        >
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="avatar"
            loading="lazy"
          />
        </a>

        <div className="profile-identity">
          <h2 className="profile-name">
            {user.name ?? user.login}
          </h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="profile-login"
          >
            @{user.login}
          </a>
          <p className="profile-joined">
            Joined {formatDate(user.created_at)}
          </p>
        </div>
      </div>

      {user.bio && (
        <p className="profile-bio">{user.bio}</p>
      )}

      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-value">{formatNumber(user.followers)}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-divider" aria-hidden="true" />
        <div className="stat-item">
          <span className="stat-value">{formatNumber(user.following)}</span>
          <span className="stat-label">Following</span>
        </div>
        <div className="stat-divider" aria-hidden="true" />
        <div className="stat-item">
          <span className="stat-value">{formatNumber(user.public_repos)}</span>
          <span className="stat-label">Repos</span>
        </div>
      </div>

      <ul className="profile-meta">
        {user.location && (
          <li className="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{user.location}</span>
          </li>
        )}

        {user.blog && (
          <li className="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
            <a
              href={ensureHttps(user.blog)}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-link"
            >
              {user.blog}
            </a>
          </li>
        )}

        {user.company && (
          <li className="meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>{user.company}</span>
          </li>
        )}

        {user.twitter_username && (
          <li className="meta-item">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <a
              href={`https://twitter.com/${user.twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="meta-link"
            >
              @{user.twitter_username}
            </a>
          </li>
        )}
      </ul>
    </article>
  );
};

export default ProfileCard;
