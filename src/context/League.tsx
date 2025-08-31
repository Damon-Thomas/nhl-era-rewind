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
import getTeamsByYear from "@/data/league/leagueTeamsByYear";
import simulateLeague from "@/data/league/simulateLeague";

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
  teamsFromYear: ReturnType<typeof getTeamsByYear>;
  league: ReturnType<typeof simulateLeague>;

  constructor(year = 2024) {
    this.year = year;
    this.currentPopulation = getPopulationByYear(2025);
    this.populationNumbers = getPopulationByYear(this.year);
    this.nationalityOfLeague = getLeagueNationalityByYear(this.year);
    this.league = simulateLeague({
      currentPopulations: this.currentPopulation,
      simulatedPopulations: this.populationNumbers,
      initialLeague: [
        ...leagueRoster.forwards,
        ...leagueRoster.defensemen,
        ...leagueRoster.goalies,
      ],
      simulatedNationalityNumbers: this.nationalityOfLeague,
    });
    this.forwards = this.league.forwards;
    this.defensemen = this.league.defensemen;
    this.goalies = this.league.goalies;
    this.initialLeague = leagueRoster;
    this.currentLeague = this.league;

    this.sortedForwards = skaterSorter(this.forwards);
    this.sortedDefensemen = skaterSorter(this.defensemen);
    this.sortedSkaters = skaterSorter(this.forwards, this.defensemen);
    this.sortedGoalies = goalieSorter(this.goalies);
    this.leagueSortedByNationality = nationalitySorter([
      ...this.forwards,
      ...this.defensemen,
      ...this.goalies,
    ]);

    this.teamsFromYear = getTeamsByYear(this.year);
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
  console.log(league.league);
  return (
    <SimulationYearContext.Provider value={{ year, setYear, league }}>
      {children}
    </SimulationYearContext.Provider>
  );
}

export { SimulationYearContext, League };
