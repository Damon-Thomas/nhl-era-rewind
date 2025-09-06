import type { Player } from "@/types/player";

// league {[]} => {forwards: [], defensemen: [], goalies: []}
export default function divideLeagueByPosition(league: Player[]) {
  const forwards = league.filter((player) => player.fgq === "forward");
  const defensemen = league.filter((player) => player.fgq === "defensemen");
  const goalies = league.filter((player) => player.fgq === "goalie");
  return { forwards, defensemen, goalies };
}
