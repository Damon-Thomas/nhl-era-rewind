import type { TeamEntry } from "./getTeamsByYear";

export type teamsWithDraftPicks = TeamEntry & {
  forwardDraftPick: number;
  defensemanDraftPick: number;
  goalieDraftPick: number;
};

export default function assignDraftPick(teams: TeamEntry[]) {
  const teamsWithPicks = [...teams] as teamsWithDraftPicks[];
  const positions = ["forward", "defenseman", "goalie"] as const;
  for (const position of positions) {
    const numberOfPicks = teams.length;
    if (numberOfPicks === 0) return [];
    // Shuffle the teams array using Fisher-Yates algorithm
    for (let i = numberOfPicks - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [teamsWithPicks[i], teamsWithPicks[j]] = [
        teamsWithPicks[j],
        teamsWithPicks[i],
      ];
    }
    // Assign draft picks based on shuffled order
    return teamsWithPicks.map((team, index) => ({
      ...team,
      [`${position}DraftPick`]: index + 1,
    }));
  }

  return teamsWithPicks as teamsWithDraftPicks[];
}
