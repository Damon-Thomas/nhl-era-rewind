import { useState } from "react";
import "./App.css";
import PlayerBar from "./components/PlayerBar";
import StatPageNav from "./components/StatPageNav";
import HeadingRow from "./components/HeadingRow";
import {
  sortedRoster,
  sortedForwards,
  sortedDefensemen,
  sortedGoalies,
} from "./data/league/preSortedLeague";
import StatsDropDown from "./components/DropDown";
import type { Player } from "./types/player";
import LeagueToggle from "./components/LeagueToggle";
import YearInput from "./components/YearInput";
import Header from "./components/Header";

function App() {
  const [currentLeagueSelector, setCurrentLeagueSelector] = useState<
    "full" | "position"
  >("full");
  // Separate league selection and page state for each stat category
  const [skaterLeagueSelection, setSkaterLeagueSelection] = useState<
    10 | 25 | 50 | 100
  >(10);
  const [goalieLeagueSelection, setGoalieLeagueSelection] = useState<
    10 | 25 | 50 | 100
  >(10);
  const [forwardsLeagueSelection, setForwardsLeagueSelection] = useState<
    10 | 25 | 50 | 100
  >(10);
  const [defensemenLeagueSelection, setDefensemenLeagueSelection] = useState<
    10 | 25 | 50 | 100
  >(10);

  // Roster and sort state
  const [skaterRoster, setSkaterRoster] = useState<Player[]>(sortedRoster);
  const [goalieRoster, setGoalieRoster] = useState<Player[]>(sortedGoalies);
  const [forwardsRoster, setForwardsRoster] =
    useState<Player[]>(sortedForwards);
  const [defensemenRoster, setDefensemenRoster] =
    useState<Player[]>(sortedDefensemen);
  const [skaterPage, setSkaterPage] = useState(1);
  const [goaliePage, setGoaliePage] = useState(1);
  const [forwardsPage, setForwardsPage] = useState(1);
  const [defensemenPage, setDefensemenPage] = useState(1);

  function handlePageChange(
    type: "skater" | "goalie" | "forwards" | "defensemen",
    page: number,
    incOrDec: "inc" | "dec"
  ) {
    let rosterLength = 0;
    let setPage: (n: number) => void = () => {};
    let leagueSelection = 10;
    const currentPage = page;
    switch (type) {
      case "skater":
        rosterLength = skaterRoster.length;
        setPage = setSkaterPage;
        leagueSelection = skaterLeagueSelection;
        break;
      case "goalie":
        rosterLength = goalieRoster.length;
        setPage = setGoaliePage;
        leagueSelection = goalieLeagueSelection;
        break;
      case "forwards":
        rosterLength = forwardsRoster.length;
        setPage = setForwardsPage;
        leagueSelection = forwardsLeagueSelection;
        break;
      case "defensemen":
        rosterLength = defensemenRoster.length;
        setPage = setDefensemenPage;
        leagueSelection = defensemenLeagueSelection;
        break;
      default:
        break;
    }

    // Calculate the last page so that the last page always shows a full set (leagueSelection) unless total < leagueSelection
    const maxPage = Math.max(1, Math.ceil(rosterLength / leagueSelection));
    const lastFullPage =
      rosterLength <= leagueSelection
        ? 1
        : Math.max(
            1,
            Math.floor((rosterLength - leagueSelection) / leagueSelection) + 1
          );

    if (incOrDec === "inc") {
      // If not on last full page, increment
      if (currentPage < lastFullPage) {
        setPage(currentPage + 1);
      } else if (currentPage === lastFullPage && maxPage > lastFullPage) {
        // Jump to the 'max' page (last page, always full set)
        setPage(maxPage);
      }
      // else do nothing (already at max)
    } else {
      // If on the last page (maxPage), go back to last full page
      if (currentPage === maxPage && maxPage > lastFullPage) {
        setPage(lastFullPage);
      } else if (currentPage > 1) {
        setPage(currentPage - 1);
      }
      // else do nothing (already at 1)
    }
  }

  const [skaterSort, setSkaterSort] = useState<{ field: string; asc: boolean }>(
    {
      field: "points",
      asc: false,
    }
  );
  const [goalieSort, setGoalieSort] = useState<{ field: string; asc: boolean }>(
    {
      field: "wins",
      asc: false,
    }
  );
  const [forwardsSort, setForwardsSort] = useState<{
    field: string;
    asc: boolean;
  }>({
    field: "points",
    asc: false,
  });
  const [defensemenSort, setDefensemenSort] = useState<{
    field: string;
    asc: boolean;
  }>({
    field: "points",
    asc: false,
  });

  return (
    <div className="h-screen w-screen p-2 md:p-4">
      <Header />
      <div className="w-full">
        <div className="flex  justify-between items-center mb-4 ">
          <h2 className="">Current League</h2>
          <LeagueToggle
            setCurrentLeagueSelector={setCurrentLeagueSelector}
            currentLeagueSelector={currentLeagueSelector}
          />
        </div>
        <div className="flex flex-col md:gap-2 w-full">
          <>
            {currentLeagueSelector === "full" ? (
              <StatsDropDown
                title="Skaters"
                leagueSelection={skaterLeagueSelection}
                setLeagueSelection={setSkaterLeagueSelection}
                setPage={() => setSkaterPage(1)}
              >
                <HeadingRow
                  type="skater"
                  roster={skaterRoster as Player[]}
                  setRoster={(r: Player[]) =>
                    setSkaterRoster(r as typeof skaterRoster)
                  }
                  sortState={skaterSort}
                  setSortState={setSkaterSort}
                />

                {skaterRoster
                  .slice(
                    skaterPage ===
                      Math.max(
                        1,
                        Math.ceil(skaterRoster.length / skaterLeagueSelection)
                      )
                      ? Math.max(0, skaterRoster.length - skaterLeagueSelection)
                      : (skaterPage - 1) * skaterLeagueSelection,
                    skaterPage ===
                      Math.max(
                        1,
                        Math.ceil(skaterRoster.length / skaterLeagueSelection)
                      )
                      ? skaterRoster.length
                      : skaterPage * skaterLeagueSelection
                  )
                  .map((player, idx) => (
                    <PlayerBar key={idx} player={player} />
                  ))}
                <StatPageNav
                  pageChangeHandler={handlePageChange}
                  page={skaterPage}
                  type="skater"
                  maxPage={Math.max(
                    1,
                    Math.ceil(skaterRoster.length / skaterLeagueSelection)
                  )}
                />
              </StatsDropDown>
            ) : (
              <>
                <StatsDropDown
                  title="Forwards"
                  leagueSelection={forwardsLeagueSelection}
                  setLeagueSelection={setForwardsLeagueSelection}
                  setPage={() => setForwardsPage(1)}
                >
                  <HeadingRow
                    type="forwards"
                    roster={forwardsRoster}
                    setRoster={(r: Player[]) => setForwardsRoster(r)}
                    sortState={forwardsSort}
                    setSortState={setForwardsSort}
                  />
                  {forwardsRoster
                    .slice(
                      forwardsPage ===
                        Math.max(
                          1,
                          Math.ceil(
                            forwardsRoster.length / forwardsLeagueSelection
                          )
                        )
                        ? Math.max(
                            0,
                            forwardsRoster.length - forwardsLeagueSelection
                          )
                        : (forwardsPage - 1) * forwardsLeagueSelection,
                      forwardsPage ===
                        Math.max(
                          1,
                          Math.ceil(
                            forwardsRoster.length / forwardsLeagueSelection
                          )
                        )
                        ? forwardsRoster.length
                        : forwardsPage * forwardsLeagueSelection
                    )
                    .map((player, idx) => (
                      <PlayerBar key={idx} player={player} />
                    ))}
                  <StatPageNav
                    pageChangeHandler={handlePageChange}
                    page={forwardsPage}
                    type="forwards"
                    maxPage={Math.max(
                      1,
                      Math.ceil(forwardsRoster.length / forwardsLeagueSelection)
                    )}
                  />
                </StatsDropDown>
                <StatsDropDown
                  title="Defensemen"
                  leagueSelection={defensemenLeagueSelection}
                  setLeagueSelection={setDefensemenLeagueSelection}
                  setPage={() => setDefensemenPage(1)}
                >
                  <HeadingRow
                    type="defensemen"
                    roster={defensemenRoster}
                    setRoster={(r: Player[]) => setDefensemenRoster(r)}
                    sortState={defensemenSort}
                    setSortState={setDefensemenSort}
                  />
                  {defensemenRoster
                    .slice(
                      defensemenPage ===
                        Math.max(
                          1,
                          Math.ceil(
                            defensemenRoster.length / defensemenLeagueSelection
                          )
                        )
                        ? Math.max(
                            0,
                            defensemenRoster.length - defensemenLeagueSelection
                          )
                        : (defensemenPage - 1) * defensemenLeagueSelection,
                      defensemenPage ===
                        Math.max(
                          1,
                          Math.ceil(
                            defensemenRoster.length / defensemenLeagueSelection
                          )
                        )
                        ? defensemenRoster.length
                        : defensemenPage * defensemenLeagueSelection
                    )
                    .map((player, idx) => (
                      <PlayerBar key={idx} player={player} />
                    ))}
                  <StatPageNav
                    pageChangeHandler={handlePageChange}
                    page={defensemenPage}
                    type="defensemen"
                    maxPage={Math.max(
                      1,
                      Math.ceil(
                        defensemenRoster.length / defensemenLeagueSelection
                      )
                    )}
                  />
                </StatsDropDown>
              </>
            )}
            <StatsDropDown
              title="Goalies"
              leagueSelection={goalieLeagueSelection}
              setLeagueSelection={setGoalieLeagueSelection}
              setPage={() => setGoaliePage(1)}
            >
              <HeadingRow
                type="goalie"
                roster={goalieRoster}
                setRoster={(r: Player[]) => setGoalieRoster(r)}
                sortState={goalieSort}
                setSortState={setGoalieSort}
              />
              {goalieRoster
                .slice(
                  goaliePage ===
                    Math.max(
                      1,
                      Math.ceil(goalieRoster.length / goalieLeagueSelection)
                    )
                    ? Math.max(0, goalieRoster.length - goalieLeagueSelection)
                    : (goaliePage - 1) * goalieLeagueSelection,
                  goaliePage ===
                    Math.max(
                      1,
                      Math.ceil(goalieRoster.length / goalieLeagueSelection)
                    )
                    ? goalieRoster.length
                    : goaliePage * goalieLeagueSelection
                )
                .map((player, idx) => (
                  <PlayerBar key={idx} player={player} />
                ))}
              <StatPageNav
                pageChangeHandler={handlePageChange}
                page={goaliePage}
                type="goalie"
                maxPage={Math.max(
                  1,
                  Math.ceil(goalieRoster.length / goalieLeagueSelection)
                )}
              />
            </StatsDropDown>
          </>
          <YearInput />
        </div>
      </div>
    </div>
  );
}

export default App;
