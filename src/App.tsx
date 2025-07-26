import { useState } from "react";
import "./App.css";
import PlayerBar from "./components/PlayerBar";
import HeadingEntry from "./components/HeadingEntry";
import StatPageNav from "./components/StatPageNav";
import {
  skaterRoster,
  goalieRoster,
  forwardsRoster,
  defensemenRoster,
  handleSkaterSort,
  handleDefensemenSort,
  handleForwardsSort,
  handleGoalieSort,
} from "./data/league/leagueSorters";
import HeadingRow from "./components/HeadingRow";

function App() {
  const [currentLeagueSelector, setCurrentLeagueSelector] = useState<
    "full" | "position"
  >("full");
  const [leagueSelection, setLeagueSelection] = useState<10 | 25 | 50 | 100>(
    10
  );
  const [leagueSelectionVisible, setLeagueSelectionVisible] = useState(false);
  const selectionOptions = [10, 25, 50, 100];
  const handleLeagueSelectorChange = (value: "full" | "position") => {
    setCurrentLeagueSelector(value);
  };

  return (
    <div className="h-screen w-screen p-2 md:p-4">
      <h1>NHL Era Simulator</h1>
      <div className="w-full">
        <h2 className="">Current League</h2>
        <div className="grid [grid-template-columns:repeat(7,auto)]">
          {currentLeagueSelector === "full" ? (
            <>
              <HeadingRow type="skater" />
              {skaterRoster.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}

              <StatPageNav pageChangeHandler={() => {}} page={1} />
              <HeadingRow type="goalie" />
              {goalieRoster.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
              <StatPageNav pageChangeHandler={() => {}} page={1} />
            </>
          ) : (
            <>
              <HeadingRow type="forwards" />
              {forwardsRoster.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
              <StatPageNav pageChangeHandler={() => {}} page={1} />
              <HeadingRow type="defensemen" />
              {defensemenRoster.map((player, idx) =>
                idx < leagueSelection ? (
                  <PlayerBar key={idx} player={player} />
                ) : null
              )}
              <StatPageNav pageChangeHandler={() => {}} page={1} />
              <HeadingRow type="goalie" />
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
