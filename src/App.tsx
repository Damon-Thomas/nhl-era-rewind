import { useState } from "react";
import "./App.css";
import "./leagueCharts.css";

import leageRoster from "./data/nhl_player_stats_2024_2025.json";
import PlayerBar from "./components/PlayerBar";
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

  return (
    <div className="h-screen w-screen">
      <h1>NHL Era Simulator</h1>
      <div className="w-full">
        <h2 className="">Current League</h2>
        <div className="grid [grid-template-columns:repeat(7,auto)] gap-2">
          <p className="text-left heading">Player Name</p>
          <p className="text-left heading">Nation</p>
          <p className="text-left heading">Pos</p>
          <p className="text-right heading">GP</p>
          <p className="text-right heading">G</p>
          <p className="text-right heading">A</p>
          <p className="text-right heading">Pts</p>
          {currentLeagueSelector === "full" ? (
            <>
              {sortedRoster.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
              <p className="text-left heading">Player Name</p>
              <p className="text-left heading">Nation</p>
              <p className="text-left heading">Pos</p>
              <p className="text-right heading">GP</p>
              <p className="text-right heading">W</p>
              <p className="text-right heading">A</p>
              <p className="text-right heading">Pts</p>
              {sortedGoalies.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
            </>
          ) : (
            <>
              {" "}
              {sortedForwards.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
              {sortedDefensemen.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
              {sortedGoalies.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
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
              } p-2 m-1`}
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
