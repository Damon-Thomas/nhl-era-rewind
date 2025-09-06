import type { Player } from "@/types/player";
import type { NationalityEntry } from "../leagueNationaltyByYear";
import { NHL_COUNTRY_NAMES } from "./country_Names_Abrv";
import { goalieSorter, skaterSorter } from "../preSortedLeague";

export function reNationalizeLeague({
  simulatedNationalityNumbers,
  thanosSnapped,
}: {
  simulatedNationalityNumbers: NationalityEntry[];
  thanosSnapped: Player[];
}) {
  const finalLeague = [] as Player[];
  const extraPlayers = [] as Player[];

  simulatedNationalityNumbers.forEach((nationality) => {
    const country = nationality.Nationality;
    const canadian = country === "Canada";

    const playersFromCountry = thanosSnapped.filter(
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
  return { finalLeague, extraPlayers };
}
