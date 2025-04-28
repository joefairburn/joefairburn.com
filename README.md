# Personal Portfolio Site

A modern, minimalist personal portfolio site built with Next.js, TypeScript, and Tailwind CSS. This site showcases professional experience, skills, and integrates with external APIs to display real-time data.

## 🚀 Features

- **Modern Next.js App Router Architecture**: Built with Next.js 15 utilizing the latest React features
- **Server Components**: Utilizes React Server Components for optimal performance
- **TypeScript**: Fully typed codebase for better developer experience and code quality
- **Tailwind CSS**: Responsive design with utility-first CSS
- **API Integrations**:
  - Spotify API to show currently playing or recently played tracks
  - GitHub API to display recent activity stats
- **Accessibility**: ARIA attributes, keyboard navigation, screen reader support
- **Performance Optimized**: Suspense boundaries, caching strategies, and optimized image loading
- **Error Handling**: Robust error boundaries and graceful fallbacks

## 📂 Project Structure

```
/
├── public/              # Static assets
│   └── images/          # Image files
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── components/  # App-specific components
│   │   ├── page.tsx     # Main page
│   │   └── layout.tsx   # Root layout
│   ├── components/      # Shared components
│   │   ├── Cursor/      # Custom cursor component
│   │   ├── PersonalCard/# Personal information card
│   │   ├── Skeleton/    # Loading skeletons
│   │   └── ...          # Other components
│   ├── lib/             # Utility functions and API clients
│   │   ├── github.ts    # GitHub API integration
│   │   └── spotify.ts   # Spotify API integration
│   └── store/           # State management
│       └── cursorContext.tsx  # Cursor state context
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# GitHub API
GITHUB_TOKEN=your_github_token
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS version)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/personal-site.git
   cd personal-site
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create your `.env.local` with the required environment variables.

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Commands

| Command      | Description                          |
| ------------ | ------------------------------------ |
| `pnpm dev`   | Start the development server         |
| `pnpm build` | Build the application for production |
| `pnpm start` | Start the production server          |
| `pnpm lint`  | Run ESLint to check code quality     |

## 🧩 API Integrations

### Spotify API

The site integrates with Spotify's API to display your currently playing or recently played tracks. To set this up:

1. Create a Spotify Developer account at [developer.spotify.com](https://developer.spotify.com/)
2. Create a new application
3. Add `http://localhost:3000/callback` to the Redirect URIs
4. Copy the Client ID and Client Secret to your `.env.local` file
5. Generate a refresh token following [Spotify's authorization guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/)

### GitHub API

GitHub integration shows your recent activity stats:

1. Create a [GitHub Personal Access Token](https://github.com/settings/tokens)
2. Give it the `repo` and `user` scopes
3. Add the token to your `.env.local` file

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

- GitHub: [@joefairburn](https://github.com/joefairburn)
- LinkedIn: [Joe Fairburn](https://www.linkedin.com/in/joefairburn/)
