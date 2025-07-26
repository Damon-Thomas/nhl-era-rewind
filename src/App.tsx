import { useState } from "react";
import "./App.css";

import leageRoster from "./data/nhl_player_stats_2024_2025.json";
import PlayerBar from "./components/PlayerBar";
import HeadingEntry from "./components/HeadingEntry";
import StatPageNav from "./components/StatPageNav";
const forwards = leageRoster.forwards;
const defensemen = leageRoster.defensemen;
const goalies = leageRoster.goalies;

const playerRoster = [...forwards, ...defensemen];
const sortedRoster = [...playerRoster].sort((a, b) => {
  const aPoints = a.stats.points ?? 0;
  const bPoints = b.stats.points ?? 0;
  if (aPoints > bPoints) return -1;
  if (aPoints < bPoints) return 1;
  return 0;
});

const sortedForwards = [...forwards].sort((a, b) => {
  const aPoints = a.stats.points ?? 0;
  const bPoints = b.stats.points ?? 0;
  if (aPoints > bPoints) return -1;
  if (aPoints < bPoints) return 1;
  return 0;
});
const sortedDefensemen = [...defensemen].sort((a, b) => {
  const aPoints = a.stats.points ?? 0;
  const bPoints = b.stats.points ?? 0;
  if (aPoints > bPoints) return -1;
  if (aPoints < bPoints) return 1;
  return 0;
});
const sortedGoalies = [...goalies].sort((a, b) => {
  const aWins = a.stats.wins ?? 0;
  const bWins = b.stats.wins ?? 0;
  if (aWins > bWins) return -1;
  if (aWins < bWins) return 1;
  return 0;
});

function App() {
  const [currentLeagueSelector, setCurrentLeagueSelector] = useState<
    "full" | "postion"
  >("full");
  const [leagueSelection, setLeagueSelection] = useState<10 | 25 | 50 | 100>(
    10
  );
  const [leagueSelectionVisible, setLeagueSelectionVisible] = useState(false);
  const selectionOptions = [10, 25, 50, 100];
  const handleLeagueSelectorChange = (value: "full" | "postion") => {
    setCurrentLeagueSelector(value);
  };
  const [skaterRoster, setSkaterRoster] = useState(sortedRoster);
  const [goalieRoster, setGoalieRoster] = useState(sortedGoalies);
  const [forwardsRoster, setForwardsRoster] = useState(sortedForwards);
  const [defensemenRoster, setDefensemenRoster] = useState(sortedDefensemen);

  // Track sort direction and last sort field for each roster
  const [skaterSort, setSkaterSort] = useState<{ field: string; asc: boolean }>(
    { field: "points", asc: false }
  );
  const [goalieSort, setGoalieSort] = useState<{ field: string; asc: boolean }>(
    { field: "wins", asc: false }
  );
  const [forwardsSort, setForwardsSort] = useState<{
    field: string;
    asc: boolean;
  }>({ field: "points", asc: false });
  const [defensemenSort, setDefensemenSort] = useState<{
    field: string;
    asc: boolean;
  }>({ field: "points", asc: false });

  function handleSkaterSort(
    sortBy:
      | "points"
      | "goals"
      | "assists"
      | "gamesPlayed"
      | "name"
      | "position"
      | "nationality"
  ) {
    setSkaterSort((prev) => {
      const asc = prev.field === sortBy ? !prev.asc : false;
      const sorted = [...skaterRoster].sort((a, b) => {
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
      setSkaterRoster(sorted);
      return { field: sortBy, asc };
    });
  }

  function handleGoalieSort(
    sortBy:
      | "wins"
      | "savePercentage"
      | "goalsAgainstAvg"
      | "gamesPlayed"
      | "name"
      | "position"
      | "nationality"
  ) {
    setGoalieSort((prev) => {
      const asc = prev.field === sortBy ? !prev.asc : false;
      const sorted = [...goalieRoster].sort((a, b) => {
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
      setGoalieRoster(sorted);
      return { field: sortBy, asc };
    });
  }

  function handleForwardsSort(
    sortBy:
      | "points"
      | "goals"
      | "assists"
      | "gamesPlayed"
      | "name"
      | "position"
      | "nationality"
  ) {
    setForwardsSort((prev) => {
      const asc = prev.field === sortBy ? !prev.asc : false;
      const sorted = [...forwardsRoster].sort((a, b) => {
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
      setForwardsRoster(sorted);
      return { field: sortBy, asc };
    });
  }

  function handleDefensemenSort(
    sortBy:
      | "points"
      | "goals"
      | "assists"
      | "gamesPlayed"
      | "name"
      | "position"
      | "nationality"
  ) {
    setDefensemenSort((prev) => {
      const asc = prev.field === sortBy ? !prev.asc : false;
      const sorted = [...defensemenRoster].sort((a, b) => {
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
      setDefensemenRoster(sorted);
      return { field: sortBy, asc };
    });
  }

  return (
    <div className="h-screen w-screen p-2 md:p-4">
      <h1>NHL Era Simulator</h1>
      <div className="w-full">
        <h2 className="">Current League</h2>
        <div className="grid [grid-template-columns:repeat(7,auto)]">
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
          {currentLeagueSelector === "full" ? (
            <>
              {skaterRoster.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}

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
              <StatPageNav pageChangeHandler={() => {}} page={1} />
              {goalieRoster.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
              <StatPageNav pageChangeHandler={() => {}} page={1} />
            </>
          ) : (
            <>
              {forwardsRoster.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
              <StatPageNav pageChangeHandler={() => {}} page={1} />
              {defensemenRoster.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
              <StatPageNav pageChangeHandler={() => {}} page={1} />
              {goalieRoster.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
              <StatPageNav pageChangeHandler={() => {}} page={1} />
            </>
          )}
        </div>
        <button
          onClick={() => {
            setLeagueSelectionVisible(!leagueSelectionVisible);
          }}
        >
          {leagueSelection}
        </button>
        <div className="">
          {selectionOptions.map((option) => (
            <button
              key={option}
              onClick={() => {
                setLeagueSelection(option as 10 | 25 | 50 | 100);
                setLeagueSelectionVisible(false);
              }}
              className={`${
                leagueSelection === option ? "bg-blue-500" : "bg-gray-300"
              } p-2 m-1 ${leagueSelectionVisible ? "" : "hidden"}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
