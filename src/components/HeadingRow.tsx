import {
  handleGoalieSort,
  handleSkaterSort,
} from "../data/league/leagueSorters";
import HeadingEntry from "./HeadingEntry";

export default function HeadingRow({
  type = "skater",
}: {
  type?: "skater" | "goalie" | "defensemen" | "forwards";
}) {
  return (
    <>
      {type === "skater" ? (
        <>
          <HeadingEntry
            label="Player Name"
            side="left"
            sortHandler={() => handleSkaterSort("name")}
          />
          <HeadingEntry
            label="Nation"
            side="left"
            sortHandler={() => handleSkaterSort("nationality")}
          />
          <HeadingEntry
            label="Pos"
            side="left"
            sortHandler={() => handleSkaterSort("position")}
          />
          <HeadingEntry
            label="GP"
            side="right"
            sortHandler={() => handleSkaterSort("gamesPlayed")}
          />
          <HeadingEntry
            label="G"
            side="right"
            sortHandler={() => handleSkaterSort("goals")}
          />
          <HeadingEntry
            label="A"
            side="right"
            sortHandler={() => handleSkaterSort("assists")}
          />
          <HeadingEntry
            label="Pts"
            side="right"
            sortHandler={() => handleSkaterSort("points")}
          />
        </>
      ) : type === "goalie" ? (
        <>
          <HeadingEntry
            label="Player Name"
            side="left"
            sortHandler={() => handleGoalieSort("name")}
          />
          <HeadingEntry
            label="Nation"
            side="left"
            sortHandler={() => handleGoalieSort("nationality")}
          />
          <HeadingEntry
            label="Pos"
            side="left"
            sortHandler={() => handleGoalieSort("position")}
          />
          <HeadingEntry
            label="GP"
            side="right"
            sortHandler={() => handleGoalieSort("gamesPlayed")}
          />
          <HeadingEntry
            label="W"
            side="right"
            sortHandler={() => handleGoalieSort("wins")}
          />
          <HeadingEntry
            label="Pct"
            side="right"
            sortHandler={() => handleGoalieSort("savePercentage")}
          />
          <HeadingEntry
            label="GA"
            side="right"
            sortHandler={() => handleGoalieSort("goalsAgainstAvg")}
          />
        </>
      ) : type === "defensemen" ? null : type === "forwards" ? null : null}
    </>
  );
}
