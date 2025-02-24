import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const GITHUB_USERNAME = "joefairburn";

/**
 * Fetches events for the authenticated user from the past 7 days.
 */
async function getUserEvents(): Promise<any[]> {
  const events = [];
  const since = new Date();
  since.setDate(since.getDate() - 7);

  let page = 1;
  let fetchedEvents;

  do {
    fetchedEvents = await octokit.rest.activity.listEventsForAuthenticatedUser({
      username: GITHUB_USERNAME,
      per_page: 100,
      page,
    });

    events.push(...fetchedEvents.data);
    const lastEventDate = fetchedEvents.data.length > 0 ? fetchedEvents.data[fetchedEvents.data.length - 1].created_at : null;
    if (lastEventDate && new Date(lastEventDate) > since) {
      page++;
    } else {
      break;
    }
  } while (fetchedEvents.data.length > 0);

  return events;
}

/**
 * Filters events to get commits and pull requests from the past 7 days.
 */
async function getCommitsAndPullRequests(): Promise<{ commits: number; pullRequests: number }> {
  const events = await getUserEvents();
  const since = new Date();
  since.setDate(since.getDate() - 7);

  let commitCount = 0;
  let pullRequestCount = 0;

  for (const event of events) {
    if (new Date(event.created_at) < since) {
      break;
    }

    if (event.type === "PushEvent") {
      commitCount += event.payload.commits.length;
    } else if (event.type === "PullRequestEvent" && event.payload.action === "opened") {
      pullRequestCount++;
    }
  }

  return { commits: commitCount, pullRequests: pullRequestCount };
}

export async function getTotalCommitsAndPullRequests(): Promise<{ commits: number; pullRequests: number }> {
  const { commits, pullRequests } = await getCommitsAndPullRequests();
  return { commits, pullRequests };
}