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

  return (
    <>
      {type != "goalie" ? (
        <>
          <HeadingEntry
            label="Player Name"
            side="left"
            sortHandler={() => sort("name")}
          />
          <HeadingEntry
            label="Nation"
            side="left"
            sortHandler={() => sort("nationality")}
          />
          <HeadingEntry
            label="Pos"
            side="left"
            sortHandler={() => sort("position")}
            size="md"
          />
          <HeadingEntry
            label="GP"
            side="right"
            sortHandler={() => sort("gamesPlayed")}
            size="sm"
          />
          <HeadingEntry
            label="G"
            side="right"
            sortHandler={() => sort("goals")}
            size="sm"
          />
          <HeadingEntry
            label="A"
            side="right"
            sortHandler={() => sort("assists")}
            size="sm"
          />
          <HeadingEntry
            label="Pts"
            side="right"
            sortHandler={() => sort("points")}
            size="sm"
          />
        </>
      ) : (
        <>
          <HeadingEntry
            label="Player Name"
            side="left"
            sortHandler={() => sort("name")}
          />
          <HeadingEntry
            label="Nation"
            side="left"
            sortHandler={() => sort("nationality")}
          />
          <HeadingEntry
            label="Pos"
            side="left"
            sortHandler={() => sort("position")}
            size="md"
          />
          <HeadingEntry
            label="GP"
            side="right"
            sortHandler={() => sort("gamesPlayed")}
            size="sm"
          />
          <HeadingEntry
            label="W"
            side="right"
            sortHandler={() => sort("wins")}
            size="sm"
          />
          <HeadingEntry
            label="Pct"
            side="right"
            sortHandler={() => sort("savePercentage")}
            size="sm"
          />
          <HeadingEntry
            label="GA"
            side="right"
            sortHandler={() => sort("goalsAgainstAvg")}
            size="sm"
          />
        </>
      )}
    </>
  );
}
