import leageRoster from "../staticData/nhl_player_stats_2024_2025.json";

const forwards = leageRoster.forwards;
const defensemen = leageRoster.defensemen;
const goalies = leageRoster.goalies;

const playerRoster = [...forwards, ...defensemen];
export const sortedRoster = [...playerRoster].sort((a, b) => {
  const aPoints = a.stats.points ?? 0;
  const bPoints = b.stats.points ?? 0;
  if (aPoints > bPoints) return -1;
  if (aPoints < bPoints) return 1;
  return 0;
});

export const sortedForwards = [...forwards].sort((a, b) => {
  const aPoints = a.stats.points ?? 0;
  const bPoints = b.stats.points ?? 0;
  if (aPoints > bPoints) return -1;
  if (aPoints < bPoints) return 1;
  return 0;
});
export const sortedDefensemen = [...defensemen].sort((a, b) => {
  const aPoints = a.stats.points ?? 0;
  const bPoints = b.stats.points ?? 0;
  if (aPoints > bPoints) return -1;
  if (aPoints < bPoints) return 1;
  return 0;
});
export const sortedGoalies = [...goalies].sort((a, b) => {
  const aWins = a.stats.wins ?? 0;
  const bWins = b.stats.wins ?? 0;
  if (aWins > bWins) return -1;
  if (aWins < bWins) return 1;
  return 0;
});
