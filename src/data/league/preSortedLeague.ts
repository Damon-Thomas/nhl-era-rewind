import type { Player } from "@/types/player";

export function skaterSorter(forwards?: Player[], defensemen?: Player[]) {
  return [...(forwards ?? []), ...(defensemen ?? [])].sort((a, b) => {
    const aPoints = a.stats.points ?? 0;
    const bPoints = b.stats.points ?? 0;
    if (aPoints > bPoints) return -1;
    if (aPoints < bPoints) return 1;
    return 0;
  });
}

export function goalieSorter(goalies: Player[]) {
  return [...goalies].sort((a, b) => {
    const aWins = a.stats.wins ?? 0;
    const bWins = b.stats.wins ?? 0;
    if (aWins > bWins) return -1;
    if (aWins < bWins) return 1;
    return 0;
  });
}

export function nationalitySorter(players: Player[]) {
  return [...players].sort((a, b) => {
    const aNat = a.nationality;
    const bNat = b.nationality;
    return aNat.localeCompare(bNat);
  });
}
