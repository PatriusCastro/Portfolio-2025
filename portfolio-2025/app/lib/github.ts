export async function getGithubStats() {
  const username = "PatriusCastro";

  const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await repoRes.json();

  const projectCount = repos.length;
  const stars = repos.reduce(
    (acc: number, repo: any) => acc + repo.stargazers_count,
    0
  );

  return { projectCount, stars };
}
