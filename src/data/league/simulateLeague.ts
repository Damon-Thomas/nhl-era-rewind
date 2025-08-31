import type { Player } from "@/types/player";
import type { populationEntry } from "./populationsByYear";
import type { NationalityEntry } from "./leagueNationaltyByYear";
import { goalieSorter, skaterSorter } from "./preSortedLeague";

// All unique country abbreviations from nhl_player_stats_2024_2025.json
export const NHL_COUNTRY_ABBREVIATIONS = [
  "CAN",
  "USA",
  "SWE",
  "FIN",
  "RUS",
  "CZE",
  "CHE",
  "SVK",
  "DEU",
  "NOR",
  "LVA",
  "BLR",
  "AUS",
  "GBR",
  "UZB",
  "AUT",
  "FRA",
  "DNK",
  "SVN",
];

// Mapping of country abbreviations to full country names (formatted as in nhl_nationality_data.json)
export const NHL_COUNTRY_NAMES: { [abbr: string]: string } = {
  CAN: "Canada",
  USA: "United States",
  SWE: "Sweden",
  FIN: "Finland",
  RUS: "Russia",
  CZE: "Czech Republic",
  CHE: "Switzerland",
  SVK: "Slovakia",
  DEU: "Germany",
  NOR: "Norway",
  LVA: "Latvia",
  BLR: "Belarus",
  AUS: "Australia",
  GBR: "United Kingdom",
  UZB: "Uzbekistan",
  AUT: "Austria",
  FRA: "France",
  DNK: "Denmark",
  SVN: "Slovenia",
};

type shrinkRatesType = {
  [key: string]: number;
};

export default function simulateLeague({
  currentPopulations,
  simulatedPopulations,
  initialLeague,
  simulatedNationalityNumbers,
}: {
  currentPopulations: populationEntry[];
  simulatedPopulations: populationEntry[];
  initialLeague: Player[];
  simulatedNationalityNumbers: NationalityEntry[];
}) {
  // Calculate shrink rates based on population changes and add to new object shrinkRates
  const shrinkRates = {} as shrinkRatesType;
  simulatedPopulations.map((simulatedPopulation) => {
    const currentPopulation = currentPopulations.find(
      (Country) => Country.Country === simulatedPopulation.Country
    );
    if (!currentPopulation) {
      console.error(
        "Error finding current population for country:",
        simulatedPopulation.Country
      );
      return initialLeague;
    }
    const shrinkRate =
      simulatedPopulation.Population / currentPopulation.Population;
    shrinkRates[simulatedPopulation.Country] =
      shrinkRate <= 0.9 ? shrinkRate : 1;
  });
  // Now apply shrink rates to initial league to create simulated league. Players are removed randomly based on shrink rate.
  const thanosSnapped = { league: [] } as { league: Player[] };
  Object.entries(shrinkRates).map(([country, rate]) => {
    const playersFromCountry = initialLeague.filter(
      (player) => NHL_COUNTRY_NAMES[player.nationality] === country
    );
    if (playersFromCountry.length === 0) return;
    const numberToRemove = Math.floor(playersFromCountry.length * (1 - rate));
    const shuffledPlayers = playersFromCountry.sort(() => 0.5 - Math.random());
    const playersToKeep = shuffledPlayers.slice(
      numberToRemove,
      playersFromCountry.length
    );
    thanosSnapped.league.push(...playersToKeep);
  });

  // Players from countries not in shrinkRates are not included in the simulated league, so they are ignored.
  // Ensure the simulated league has the correct number of players from each country based on simulatedNationalityNumbers.
  const finalLeague = [] as Player[];
  const extraPlayers = [] as Player[];

  simulatedNationalityNumbers.forEach((nationality) => {
    const country = nationality.Nationality;
    const canadian = country === "Canada";

    // Debug logging
    console.log("Nationality:", country);
    console.log(
      "Player nationalities:",
      [
        ...new Set(
          thanosSnapped.league.map((p) => NHL_COUNTRY_NAMES[p.nationality])
        ),
      ].slice(0, 5)
    );
    console.log(
      "Exact match count:",
      thanosSnapped.league.filter(
        (p) => NHL_COUNTRY_NAMES[p.nationality] === country
      ).length
    );
    console.log(
      "Contains match count:",
      thanosSnapped.league.filter((p) =>
        NHL_COUNTRY_NAMES[p.nationality]?.includes(country)
      ).length
    );

    const playersFromCountry = thanosSnapped.league.filter(
      (player) => NHL_COUNTRY_NAMES[player.nationality] === country
    );
    if (playersFromCountry.length === 0) return;
    if (playersFromCountry.length < nationality.Players) {
      finalLeague.push(...playersFromCountry);
      return;
    }
    const players = skaterSorter(
      playersFromCountry.filter((player) => player.position !== "G")
    );
    const goalies = goalieSorter(
      playersFromCountry.filter((player) => player.position === "G")
    );
    let playerIdx = 0;
    let goalieIdx = 0;
    const playersBeingAdded = [];
    while (playersBeingAdded.length < nationality.Players) {
      if (playerIdx < players.length) {
        playersBeingAdded.push(players[playerIdx]);
        playerIdx++;
      }
      if (goalieIdx < goalies.length) {
        playersBeingAdded.push(goalies[goalieIdx]);
        goalieIdx++;
      }
      if (goalieIdx >= goalies.length) {
        playersBeingAdded.push(
          ...players.slice(playersBeingAdded.length, nationality.Players)
        );
        break;
      }
      if (playerIdx >= players.length) {
        playersBeingAdded.push(
          ...goalies.slice(playersBeingAdded.length, nationality.Players)
        );
        break;
      }
    }

    if (playersBeingAdded.length > nationality.Players && canadian) {
      extraPlayers.push(...playersBeingAdded.slice(nationality.Players));
    }
    finalLeague.push(...playersBeingAdded.slice(0, nationality.Players));
    if (canadian) {
      extraPlayers.push(
        ...playersBeingAdded.slice(nationality.Players),
        ...players.slice(playerIdx),
        ...goalies.slice(goalieIdx)
      );
    }
  });

  // add extra players from Canada to fill league if short
  return divideLeagueByPosition(finalLeague);
}

function divideLeagueByPosition(league: Player[]) {
  const forwards = league.filter((player) => player.fgq === "forward");
  const defensemen = league.filter((player) => player.fgq === "defensemen");
  const goalies = league.filter((player) => player.fgq === "goalie");
  return { forwards, defensemen, goalies };
}
