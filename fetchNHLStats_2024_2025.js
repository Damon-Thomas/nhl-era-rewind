import fetch from "node-fetch";
import fs from "fs/promises";

const API_URL = "https://api-web.nhle.com/pub/v1/stats/skater?season=20242025";

const headers = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  Accept: "application/json",
  Referer: "https://www.nhl.com/",
};

async function main() {
  const res = await fetch(API_URL, { headers });

  if (!res.ok) {
    console.error("HTTP error", res.status, res.statusText);
    const text = await res.text();
    console.error("Response body:", text);
    return;
  }

  const data = await res.json();

  // `data` includes .data array with player objects
  const formatted = data.data.map((player) => ({
    id: player.player.id,
    fullName: player.player.fullName,
    nationality: player.player.nationality,
    goals: player.stats.goals,
    assists: player.stats.assists,
    points: player.stats.points,
  }));

  await fs.writeFile(
    "./nhl_skater_stats_2024_2025.json",
    JSON.stringify(formatted, null, 2)
  );
  console.log(
    `Saved ${formatted.length} players to nhl_skater_stats_2024_2025.json`
  );
}

main();
