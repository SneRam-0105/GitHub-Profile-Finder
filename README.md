# GitHub Profile Finder

A clean, responsive web app to search any GitHub user and instantly view their profile, stats, and top repositories — built with React, TypeScript, and the GitHub REST API.

![GitHub Profile Finder](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white) ![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

---

## Features

- Search any GitHub username and fetch their live profile
- Displays avatar, bio, location, company, website, and Twitter
- Shows follower / following / repo counts
- Lists top 6 repositories sorted by stars with language badges
- Loading spinner while the API request is in-flight
- Friendly error messages for 404 (user not found) and rate limiting
- Quick-search example chips on the welcome screen
- Fully responsive — works on mobile and desktop

---

## Tech Stack

| Layer       | Technology                 |
| ----------- | -------------------------- |
| UI Library  | React 18                   |
| Language    | TypeScript 5               |
| Build Tool  | Vite                       |
| Styling     | CSS (custom, no framework) |
| Data Source | GitHub REST API v3         |
| Deployment  | Vercel                     |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/SneRam-0105/github-profile-finder.git
cd github-profile-finder
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## Project Structure

```
src/
├── components/
│   ├── SearchBar.tsx       # Controlled input + search button
│   ├── ProfileCard.tsx     # User avatar, bio, stats, meta links
│   ├── RepoList.tsx        # Grid of top repository cards
│   ├── Loader.tsx          # Animated spinner
│   └── ErrorMessage.tsx    # Styled error display
├── hooks/
│   └── useGitHub.ts        # Custom hook — all API logic lives here
├── types/
│   └── github.ts           # TypeScript interfaces for API responses
├── App.tsx                 # Root component, layout, state wiring
├── App.css                 # App-level styles
└── index.css               # Global reset and CSS variables
```

---

## Concepts Covered

This project was built to practice core React and TypeScript skills:

- **`useState`** — managing search input, user data, repos, loading, and error state
- **`useEffect`** — triggering API calls reactively when the username changes
- **Custom Hooks** — extracting all fetch logic into `useGitHub` for reuse and clean components
- **TypeScript Interfaces** — strongly typed API responses (`GitHubUser`, `GitHubRepo`)
- **`async / await`** — clean asynchronous fetch calls without nested `.then()` chains
- **Loading States** — spinner shown while the request is in-flight
- **Error Handling** — `try / catch / finally` with specific messages for 404 and rate limits
- **Component Structure** — each UI concern is its own focused, reusable component
- **Deployment** — CI/CD via Vercel with automatic deploys on every push

---

## API

This app uses the public [GitHub REST API](https://docs.github.com/en/rest) — no authentication required.

| Endpoint                                            | Used for               |
| --------------------------------------------------- | ---------------------- |
| `GET /users/{username}`                             | Fetch user profile     |
| `GET /users/{username}/repos?sort=stars&per_page=6` | Fetch top repositories |

> **Note:** The unauthenticated rate limit is 60 requests/hour per IP. If you hit the limit, wait a minute and try again.

---

## License

MIT
