import type { Player } from "@/types/player";
import { handleRosterSort } from "../data/league/leagueSorters";
import HeadingEntry from "./HeadingEntry";

interface HeadingRowProps {
  type?: "skater" | "goalie" | "defensemen" | "forwards";
  roster: Player[];
  setRoster: (r: Player[]) => void;
  sortState: { field: string; asc: boolean };
  setSortState: (s: { field: string; asc: boolean }) => void;
}

export default function HeadingRow({
  type = "skater",
  roster,
  setRoster,
  sortState,
  setSortState,
}: HeadingRowProps) {
  type SortBy =
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

  const sort = (sortBy: SortBy) =>
    handleRosterSort({
      roster,
      setRoster,
      sortState,
      setSortState,
      sortBy: sortBy,
    });

  // Define column configs
  const skaterColumns = [
    { label: "Player Name", side: "left", sortBy: "name" },
    { label: "Nation", side: "left", sortBy: "nationality" },
    { label: "Pos", side: "left", sortBy: "position", size: "md" },
    { label: "GP", side: "right", sortBy: "gamesPlayed", size: "sm" },
    { label: "G", side: "right", sortBy: "goals", size: "sm" },
    { label: "A", side: "right", sortBy: "assists", size: "sm" },
    { label: "Pts", side: "right", sortBy: "points", size: "sm" },
  ];

  const goalieColumns = [
    { label: "Player Name", side: "left", sortBy: "name" },
    { label: "Nation", side: "left", sortBy: "nationality" },
    { label: "Pos", side: "left", sortBy: "position", size: "md" },
    { label: "GP", side: "right", sortBy: "gamesPlayed", size: "sm" },
    { label: "W", side: "right", sortBy: "wins", size: "sm" },
    { label: "Pct", side: "right", sortBy: "savePercentage", size: "sm" },
    { label: "GA", side: "right", sortBy: "goalsAgainstAvg", size: "sm" },
  ];

  const columns = type === "goalie" ? goalieColumns : skaterColumns;

  return (
    <>
      {columns.map((col) => (
        <HeadingEntry
          key={col.label}
          label={col.label}
          side={col.side as "left" | "right"}
          sortHandler={() => sort(col.sortBy as SortBy)}
          size={col.size as "md" | "sm" | "lg" | undefined}
        />
      ))}
    </>
  );
}
