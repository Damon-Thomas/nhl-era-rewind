import type { Player } from "../types/player";

export default function PlayerBar({ player }: { player: Player }) {
  return (
    <>
      {player.position === "G" ? (
        <>
          <p className="text-left">
            {player.firstName + " " + player.lastName}
          </p>
          <p className="text-left">{player.nationality}</p>
          <p className="text-left">{player.position}</p>
          <p className="text-right">{player.stats.gamesPlayed}</p>
          <p className="text-right">{player.stats.wins}</p>
          <p className="text-right">
            {player.stats.savePercentage?.toFixed(3)}
          </p>
          <p className="text-right">
            {player.stats.goalsAgainstAvg?.toFixed(2)}
          </p>
        </>
      ) : (
        <>
          <p className="text-left">
            {player.firstName + " " + player.lastName}
          </p>
          <p className="text-left">{player.nationality}</p>
          <p className="text-left">{player.position}</p>
          <p className="text-right">{player.stats.gamesPlayed}</p>
          <p className="text-right">{player.stats.goals}</p>
          <p className="text-right">{player.stats.assists}</p>
          <p className="text-right">{player.stats.points}</p>
        </>
      )}
    </>
  );
}
