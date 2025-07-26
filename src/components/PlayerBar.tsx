import type { Player } from "../types/player";
import StatEntry from "./StatEntry";

export default function PlayerBar({ player }: { player: Player }) {
  return (
    <>
      {player.position === "G" ? (
        <>
          <StatEntry
            stat={player.firstName + " " + player.lastName}
            side="left"
          />
          <StatEntry stat={player.nationality} side="left" />
          <StatEntry stat={player.position} side="left" />
          <StatEntry stat={player.stats.gamesPlayed} side="right" />
          <StatEntry stat={player.stats.wins} side="right" />
          <StatEntry
            stat={player.stats.savePercentage}
            side="right"
            round={3}
          />
          <StatEntry
            stat={player.stats.goalsAgainstAvg}
            side="right"
            round={2}
          />
        </>
      ) : (
        <>
          <StatEntry
            stat={player.firstName + " " + player.lastName}
            side="left"
          />
          <StatEntry stat={player.nationality} side="left" />
          <StatEntry stat={player.position} side="left" />
          <StatEntry stat={player.stats.gamesPlayed} side="right" />
          <StatEntry stat={player.stats.goals} side="right" />
          <StatEntry stat={player.stats.assists} side="right" />
          <StatEntry stat={player.stats.points} side="right" />
        </>
      )}
    </>
  );
}
