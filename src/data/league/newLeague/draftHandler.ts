import type { Player } from "@/types/player";
import type { teamsWithDraftPicks } from "./assignDraftPick";

export default function draftHandler(
  teamsWithDraftPicks: teamsWithDraftPicks[],
  sortedForwards: Player[],
  sortedDefensmen: Player[],
  sortedGoalies: Player[]
) {
  const positions = ["forward", "defenseman", "goalie"] as const;
  const playersByPosition = {
    forward: sortedForwards,
    defenseman: sortedDefensmen,
    goalie: sortedGoalies,
  };
  const draftedTeams = [...teamsWithDraftPicks].map((team) => ({
    ...team,
    forward: [] as Player[],
    defenseman: [] as Player[],
    goalie: [] as Player[],
  }));
  for (const position of positions) {
    const numberOfPicks = teamsWithDraftPicks.length;
    if (numberOfPicks === 0) return [];
    // Sort teams by draft pick for the current position
    const sortedTeams = [...teamsWithDraftPicks].sort(
      (a, b) => a[`${position}DraftPick`] - b[`${position}DraftPick`]
    );
    let pick = 1;
    for (let i = 0; i < playersByPosition[position].length; i++) {
      const player = playersByPosition[position][i];
      const team = sortedTeams[pick - 1];
      const draftedTeam = draftedTeams.find((t) => t.name === team.name);
      if (draftedTeam) {
        draftedTeam[`${position}`].push(player);
      }
      pick++;
      if (pick > numberOfPicks) {
        pick = 1; // Reset pick to 1 after reaching the last team
      }
    }
  }
  return draftedTeams;
}
