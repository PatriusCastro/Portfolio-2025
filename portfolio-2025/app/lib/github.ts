type Repo = { fork: boolean; stargazers_count: number };

export async function getGithubStats() {
  try {
    const res = await fetch(
      "https://api.github.com/users/PatriusCastro/repos?per_page=100",
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const repos: Repo[] = await res.json();
    const own = repos.filter(r => !r.fork);
    return {
      projectCount: own.length,
      stars: own.reduce((acc, r) => acc + r.stargazers_count, 0),
    };
  } catch {
    // ponytail: zeros on API failure so the build never breaks; cache last good value if it matters
    return { projectCount: 0, stars: 0 };
  }
}
