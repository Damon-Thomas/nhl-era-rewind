import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Player, Roster } from "@/types/player";
import leagueRoster from "../data/staticData/nhl_player_stats_2024_2025.json";
import {
  goalieSorter,
  nationalitySorter,
  skaterSorter,
} from "@/data/league/preSortedLeague";
import getPopulationByYear, {
  type populationEntry,
} from "@/data/league/populationsByYear";
import getLeagueNationalityByYear from "@/data/league/leagueNationaltyByYear";

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
  sortedGoalies: ReturnType<typeof goalieSorter>;
  leagueSortedByNationality: ReturnType<typeof nationalitySorter>;
  currentPopulation: populationEntry[];
  populationNumbers: populationEntry[];
  nationalityOfLeague: ReturnType<typeof getLeagueNationalityByYear>;

  constructor(year = 2024) {
    this.forwards = leagueRoster.forwards;
    this.defensemen = leagueRoster.defensemen;
    this.goalies = leagueRoster.goalies;
    this.initialLeague = leagueRoster;
    this.currentLeague = leagueRoster;
    this.year = year;
    this.sortedForwards = skaterSorter(this.forwards);
    this.sortedDefensemen = skaterSorter(this.defensemen);
    this.sortedSkaters = skaterSorter(this.forwards, this.defensemen);
    this.sortedGoalies = goalieSorter(this.goalies);
    this.leagueSortedByNationality = nationalitySorter([
      ...this.forwards,
      ...this.defensemen,
      ...this.goalies,
    ]);
    this.currentPopulation = getPopulationByYear(2025); // added current population data
    this.populationNumbers = getPopulationByYear(this.year);
    this.nationalityOfLeague = getLeagueNationalityByYear(this.year);
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
  year: 2024,
  setYear: () => {
    throw new Error("setYear must be used within a SimulationYearProvider");
  },
});

export function LeagueProvider({ children }: { children: React.ReactNode }) {
  const [year, setYear] = useState(2024);
  // Re-instantiate league when year changes
  const league = new League(year);
  console.log("New league instantiated for year:", year);
  console.log(league.nationalityOfLeague);
  return (
    <SimulationYearContext.Provider value={{ year, setYear, league }}>
      {children}
    </SimulationYearContext.Provider>
  );
}

export { SimulationYearContext, League };
