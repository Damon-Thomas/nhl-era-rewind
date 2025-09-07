import type { Player } from "@/types/player";
import assignDraftPick from "./assignDraftPick";
import draftHandler from "./draftHandler";
import getTeamsByYear from "./getTeamsByYear";

export default function newLeagueHandler(
  year: number,
  sortedForwards: Player[],
  sortedDefensmen: Player[],
  sortedGoalies: Player[]
) {
  // get teams for the given year
  const teams = getTeamsByYear(year);
  // add draft picks to each team
  const teamsWithDraftPicks = assignDraftPick(teams);
  //use draft order to divide players into teams
  return draftHandler(
    teamsWithDraftPicks,
    sortedForwards,
    sortedDefensmen,
    sortedGoalies
  );
}
