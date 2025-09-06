import type { Player } from "@/types/player";
import type { populationEntry } from "../populationsByYear";
import type { NationalityEntry } from "../leagueNationaltyByYear";
import { GetShrinkRates } from "./getShrinkRates";
import { repopulateLeague } from "./repopulateLeague";
import { reNationalizeLeague } from "./reNationalizeLeague";
import divideLeagueByPosition from "./divideLeagueArrayByPosition";

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
  const shrinkRates = GetShrinkRates({
    currentPopulations,
    simulatedPopulations,
  });

  // Now apply shrink rates to initial league to create simulated league. Players are removed randomly based on shrink rate.
  const thanosSnapped = repopulateLeague({
    shrinkRates,
    initialLeague,
  });

  // Ensure the simulated league has the correct number of players from each country based on simulatedNationalityNumbers.
  const { finalLeague, extraPlayers } = reNationalizeLeague({
    simulatedNationalityNumbers,
    thanosSnapped,
  });

  // Use finalLeague and extraPlayers in the returned object and divide them by position
  return {
    league: divideLeagueByPosition(finalLeague),
    extras: divideLeagueByPosition(extraPlayers),
  };
}
