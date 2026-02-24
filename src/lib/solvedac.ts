export type SolvedUser = {
  handle: string;
  tier: number;

  solvedCount?: number;
  rank?: number;

  class?: number;
  classDecoration?: string;

  profileImageUrl?: string | null;

  backgroundId?: string | null;
  badgeId?: string | null;

  maxStreak?: number;
};

export async function fetchSolvedUser(handle: string): Promise<SolvedUser> {
  const url = `https://solved.ac/api/v3/user/show?handle=${encodeURIComponent(handle)}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`solved.ac API error ${res.status}`);
  return (await res.json()) as SolvedUser;
}
