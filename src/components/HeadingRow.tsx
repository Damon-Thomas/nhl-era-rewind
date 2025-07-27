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
      {type === "skater" ? (
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
          />
          <HeadingEntry
            label="GP"
            side="right"
            sortHandler={() => sort("gamesPlayed")}
          />
          <HeadingEntry
            label="G"
            side="right"
            sortHandler={() => sort("goals")}
          />
          <HeadingEntry
            label="A"
            side="right"
            sortHandler={() => sort("assists")}
          />
          <HeadingEntry
            label="Pts"
            side="right"
            sortHandler={() => sort("points")}
          />
        </>
      ) : type === "goalie" ? (
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
          />
          <HeadingEntry
            label="GP"
            side="right"
            sortHandler={() => sort("gamesPlayed")}
          />
          <HeadingEntry
            label="W"
            side="right"
            sortHandler={() => sort("wins")}
          />
          <HeadingEntry
            label="Pct"
            side="right"
            sortHandler={() => sort("savePercentage")}
          />
          <HeadingEntry
            label="GA"
            side="right"
            sortHandler={() => sort("goalsAgainstAvg")}
          />
        </>
      ) : type === "defensemen" ? null : type === "forwards" ? null : null}
    </>
  );
}
