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

          <StatEntry stat={player.position} side="left" size={"md"} />
          <StatEntry stat={player.stats.gamesPlayed} side="right" size={"sm"} />
          <StatEntry stat={player.stats.wins} side="right" size={"sm"} />
          <StatEntry
            stat={player.stats.savePercentage}
            side="right"
            round={3}
            size={"sm"}
          />
          <StatEntry
            stat={player.stats.goalsAgainstAvg}
            side="right"
            round={2}
            size={"sm"}
          />
        </>
      ) : (
        <>
          <StatEntry
            stat={player.firstName + " " + player.lastName}
            side="left"
          />
          <StatEntry stat={player.nationality} side="left" />
          <StatEntry stat={player.position} side="left" size={"md"} />
          <StatEntry stat={player.stats.gamesPlayed} side="right" size={"sm"} />
          <StatEntry stat={player.stats.goals} side="right" size={"sm"} />
          <StatEntry stat={player.stats.assists} side="right" size={"sm"} />
          <StatEntry stat={player.stats.points} side="right" size={"sm"} />
        </>
      )}
    </>
  );
}
