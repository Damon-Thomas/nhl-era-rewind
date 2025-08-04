import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "./nhl_player_stats_2024_2025.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Filter players who have played at least 1 game for each position category
const filterPlayersWithGames = (players) => {
  return players.filter((player) => {
    // Check if player has stats and gamesPlayed is a valid number >= 1
    return (
      player.stats &&
      player.stats.gamesPlayed !== null &&
      player.stats.gamesPlayed !== undefined &&
      player.stats.gamesPlayed >= 1
    );
  });
};

// Apply filtering to each position category
if (data.forwards) {
  data.forwards = filterPlayersWithGames(data.forwards);
}
if (data.defensemen) {
  data.defensemen = filterPlayersWithGames(data.defensemen);
}
if (data.goalies) {
  data.goalies = filterPlayersWithGames(data.goalies);
}

// Calculate total filtered players
const totalPlayers =
  (data.forwards?.length || 0) +
  (data.defensemen?.length || 0) +
  (data.goalies?.length || 0);

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(
  `Filtered data saved. Players with at least 1 game: ${totalPlayers}`
);
