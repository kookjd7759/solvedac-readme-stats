export type SolvedUser = {
  handle: string;
  tier: number;
  solvedCount?: number;
  maxStreak?: number;
};

export async function fetchSolvedUser(handle: string): Promise<SolvedUser> {
  const url = `https://solved.ac/api/v3/user/show?handle=${encodeURIComponent(handle)}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`solved.ac API error ${res.status}`);
  return (await res.json()) as SolvedUser;
}
