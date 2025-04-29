import { Octokit } from "@octokit/rest";
import { validateEnvVars } from "./security.config";

// Custom error type for GitHub API issues
export class GitHubAPIError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'GitHubAPIError';
    this.status = status;
  }
}

// Initialize the Octokit client
const getOctokit = (): Octokit => {
  // Use centralized env var validation
  validateEnvVars();
  return new Octokit({ auth: process.env.GITHUB_TOKEN });
};

const GITHUB_USERNAME = "joefairburn";

/**
 * Fetches events for the authenticated user from the past 7 days.
 * @returns Array of GitHub events
 */
async function getUserEvents(): Promise<any[]> {
  'use cache'
  try {
    const octokit = getOctokit();
    const events = [];
    // Define max number of events/pages to fetch
    const maxPages = 3;
    const perPage = 100;

    for (let page = 1; page <= maxPages; page++) {
      try {
        const fetchedEvents = await octokit.rest.activity.listEventsForAuthenticatedUser({
          username: GITHUB_USERNAME,
          per_page: perPage,
          page,
        });

        if (fetchedEvents.data.length === 0) {
          // Stop if a page returns no events
          break;
        }

        events.push(...fetchedEvents.data);

        // Stop if we fetched fewer events than requested, indicating the last page
        if (fetchedEvents.data.length < perPage) {
          break;
        }

      } catch (error: any) {
        if (error.status === 404) {
          console.error(`GitHub user '${GITHUB_USERNAME}' not found`);
          // Return empty array on 404, no need to continue fetching
          return []; 
        }
        // Re-throw other errors to be caught by the outer catch block
        throw new GitHubAPIError(
          `Failed to fetch GitHub events page ${page}: ${error.message}`,
          error.status
        );
      }
    }

    // Filtering by date will happen in getCommitsAndPullRequests
    return events;
  } catch (error) {
    // Log errors from getOctokit or re-thrown GitHubAPIErrors
    console.error('Error fetching GitHub events:', error instanceof Error ? error.message : 'Unknown error');
    // Return empty array on error so the calling function can handle it
    return [];
  }
}

/**
 * Filters events to get commits and pull requests from the past 7 days.
 * @returns Object containing commit and pull request counts
 */
async function getCommitsAndPullRequests(): Promise<{ commits: number; pullRequests: number }> {
  'use cache'
  try {
    const events = await getUserEvents();
    const since = new Date();
    since.setDate(since.getDate() - 7);

    let commitCount = 0;
    let pullRequestCount = 0;

    for (const event of events) {
      if (new Date(event.created_at) < since) {
        break;
      }

      if (event.type === "PushEvent" && event.payload?.commits) {
        commitCount += event.payload.commits.length;
      } else if (event.type === "PullRequestEvent" && event.payload?.action === "opened") {
        pullRequestCount++;
      }
    }

    return { commits: commitCount, pullRequests: pullRequestCount };
  } catch (error) {
    console.error('Error processing GitHub events:', error instanceof Error ? error.message : 'Unknown error');
    return { commits: 0, pullRequests: 0 };
  }
}

/**
 * Gets the total number of commits and pull requests in the past 7 days.
 * @returns Object containing commit and pull request counts
 */
export async function getTotalCommitsAndPullRequests(): Promise<{ commits: number; pullRequests: number; error?: boolean }> {
  'use cache'
  try {
    const { commits, pullRequests } = await getCommitsAndPullRequests();
    return { commits, pullRequests };
  } catch (error) {
    console.error('Error getting GitHub stats:', error instanceof Error ? error.message : 'Unknown error');
    // Return error object with default counts
    return { commits: 0, pullRequests: 0, error: true };
  }
}