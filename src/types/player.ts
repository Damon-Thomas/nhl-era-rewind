export type Player = {
  playerId: number;
  headshot: string;
  firstName: string;
  lastName: string;
  position: string;
  nationality: string;
  fgq: string;
  stats: {
    gamesPlayed?: number | null;
    goals?: number | null;
    assists?: number | null;
    points?: number | null;
    goalsAgainstAvg?: number | null;
    savePercentage?: number | null;
    wins?: number | null;
  };
};
