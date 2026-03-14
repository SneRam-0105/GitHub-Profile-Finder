import { useState, useEffect } from 'react';
import { GitHubUser, GitHubRepo, GitHubState } from '../types/github';

const GITHUB_API_BASE = 'https://api.github.com';

export function useGitHub(username: string): GitHubState {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username.trim()) {
      setUser(null);
      setRepos([]);
      setError(null);
      return;
    }

    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);
      setUser(null);
      setRepos([]);

      try {
        const userResponse = await fetch(
          `${GITHUB_API_BASE}/users/${username}`
        );

        if (!userResponse.ok) {
          if (userResponse.status === 404) {
            throw new Error(
              `No GitHub user found with the username "${username}". Please check the spelling and try again.`
            );
          }
          if (userResponse.status === 403) {
            throw new Error(
              'GitHub API rate limit exceeded. Please wait a minute and try again.'
            );
          }
          throw new Error(
            `GitHub API error: ${userResponse.status} ${userResponse.statusText}`
          );
        }

        const userData: GitHubUser = await userResponse.json();
        setUser(userData);

        const reposResponse = await fetch(
          `${GITHUB_API_BASE}/users/${username}/repos?sort=stars&per_page=6`
        );

        if (!reposResponse.ok) {
          throw new Error(
            `Failed to fetch repositories: ${reposResponse.status} ${reposResponse.statusText}`
          );
        }

        const reposData: GitHubRepo[] = await reposResponse.json();
        setRepos(reposData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  return { user, repos, loading, error };
}
