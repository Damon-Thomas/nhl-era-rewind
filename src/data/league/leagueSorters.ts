import type { Player } from "@/types/player";

// Generic sort handler
export function handleRosterSort({
  roster,
  setRoster,
  sortState,
  setSortState,
  sortBy,
}: {
  roster: Player[];
  setRoster: (r: Player[]) => void;
  sortState: { field: string; asc: boolean };
  setSortState: (s: { field: string; asc: boolean }) => void;
  sortBy:
    | "points"
    | "goals"
    | "assists"
    | "gamesPlayed"
    | "name"
    | "position"
    | "nationality"
    | "wins"
    | "savePercentage"
    | "goalsAgainstAvg";
}) {
  const asc = sortState.field === sortBy ? !sortState.asc : false;
  const sorted = [...roster].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "name") {
      const aName = (a.firstName + " " + a.lastName).toLowerCase();
      const bName = (b.firstName + " " + b.lastName).toLowerCase();
      cmp = aName.localeCompare(bName);
    } else if (sortBy === "position") {
      cmp = a.position.localeCompare(b.position);
    } else if (sortBy === "nationality") {
      cmp = a.nationality.localeCompare(b.nationality);
    } else {
      const aStat = a.stats[sortBy] ?? 0;
      const bStat = b.stats[sortBy] ?? 0;
      cmp = bStat - aStat;
    }
    return asc ? -cmp : cmp;
  });
  setRoster(sorted);
  setSortState({ field: sortBy, asc });
}
