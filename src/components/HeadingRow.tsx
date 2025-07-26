import { handleRosterSort } from "../data/league/leagueSorters";
import HeadingEntry from "./HeadingEntry";

interface HeadingRowProps {
  type?: "skater" | "goalie" | "defensemen" | "forwards";
  roster: any[];
  setRoster: (r: any[]) => void;
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
  const sort = (sortBy: string) =>
    handleRosterSort({
      roster,
      setRoster,
      sortState,
      setSortState,
      sortBy: sortBy as any,
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
