import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Player, Roster } from "@/types/player";
import leagueRoster from "../data/staticData/nhl_player_stats_2024_2025.json";
import { skaterSorter } from "@/data/league/preSortedLeague";

type SimulationYearContextType = {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  league: League;
};

// league class handles all league manipulation and is the single source of truth for league data
class League {
  forwards: Player[];
  defensemen: Player[];
  goalies: Player[];
  initialLeague: Roster;
  currentLeague: Roster;
  year: number;
  sortedForwards: ReturnType<typeof skaterSorter>;
  sortedDefensemen: ReturnType<typeof skaterSorter>;
  sortedSkaters: ReturnType<typeof skaterSorter>;
  sortedGoalies: ReturnType<typeof skaterSorter>;

  constructor(year = 2025) {
    this.forwards = leagueRoster.forwards;
    this.defensemen = leagueRoster.defensemen;
    this.goalies = leagueRoster.goalies;
    this.initialLeague = leagueRoster;
    this.currentLeague = leagueRoster;
    this.year = year;
    this.sortedForwards = skaterSorter(this.forwards);
    this.sortedDefensemen = skaterSorter(this.defensemen);
    this.sortedSkaters = skaterSorter(this.forwards, this.defensemen);
    this.sortedGoalies = skaterSorter(this.goalies);
  }

  getPositionalRoster() {
    return {
      ...this.currentLeague,
    };
  }

  getFullRoster() {
    return {
      forwards: this.currentLeague.forwards,
      defensemen: this.currentLeague.defensemen,
      goalies: this.currentLeague.goalies,
    };
  }
}

const SimulationYearContext = createContext<SimulationYearContextType>({
  league: undefined as unknown as League,
  year: 2025,
  setYear: () => {
    throw new Error("setYear must be used within a SimulationYearProvider");
  },
});

export function LeagueProvider({ children }: { children: React.ReactNode }) {
  const [year, setYear] = useState(2025);
  // Re-instantiate league when year changes
  const league = new League(year);
  console.log("New league instantiated for year:", year);
  return (
    <SimulationYearContext.Provider value={{ year, setYear, league }}>
      {children}
    </SimulationYearContext.Provider>
  );
}

export { SimulationYearContext };
