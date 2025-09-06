import type { Player } from "@/types/player";
import { NHL_COUNTRY_NAMES } from "./country_Names_Abrv";

export function repopulateLeague({
  shrinkRates,
  initialLeague,
}: {
  shrinkRates: { [key: string]: number };
  initialLeague: Player[];
}) {
  const thanosSnapped = [] as Player[];
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
    thanosSnapped.push(...playersToKeep);
  });
  return thanosSnapped;
}
