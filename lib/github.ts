
export interface GithubRepo {
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    updated_at: string;
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
    // Use revalidate to cache results for 1 hour to avoid rate limits
    const res = await fetch("https://api.github.com/users/adarshanand67/repos?sort=updated&per_page=100", {
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        console.error("Failed to fetch GitHub repos");
        return [];
    }

    const repos: GithubRepo[] = await res.json();

    // Sort by stars and filter out forks if desired (keeping them for now if they are significant)
    // Taking top 6
    return repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6);
}
