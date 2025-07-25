import fs from "fs";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// node src/data/handlers/fetchNHLStats_2024_2025.js
async function fetchNHLStats2024_2025() {
  const leagueRoster = [];
  console.log("Fetching NHL stats for 2024-2025 season...");
  const teams = async (req, res) => {
    try {
      const response = await fetch("https://api-web.nhle.com/v1/standings/now");
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.status}`);
      }
      const data = await response.json();

      return data.standings || [];
    } catch (err) {
      console.error("Error fetching NHL teams:", err.message);
      res.status(500).json({
        error: "Failed to fetch NHL teams",
        timestamp: new Date().toISOString(),
      });
    }
  };

  const teamResponse = await teams();
  const teamList = teamResponse.map((team) => ({
    name: team.teamName.default,
    abbreviation: team.teamAbbrev.default,
  }));

  const addRoster = async () => {
    for (const team of teamList) {
      try {
        const response = await fetch(
          `https://api-web.nhle.com/v1/roster/${team.abbreviation}/current`
        );

        const rosterData = await response.json();
        for (const player of rosterData.forwards) {
          leagueRoster.push({
            playerId: player.id,
            headshot: player.headshot,
            firstName: player.firstName.default,
            lastName: player.lastName.default,
            position: player.positionCode,
            nationality: player.birthCountry,
            fgq: "forward",
          });
        }
        for (const player of rosterData.defensemen) {
          leagueRoster.push({
            playerId: player.id,
            headshot: player.headshot,
            firstName: player.firstName.default,
            lastName: player.lastName.default,
            position: player.positionCode,
            nationality: player.birthCountry,
            fgq: "defensemen",
          });
        }
        for (const player of rosterData.goalies) {
          leagueRoster.push({
            playerId: player.id,
            headshot: player.headshot,
            firstName: player.firstName.default,
            lastName: player.lastName.default,
            position: player.positionCode,
            nationality: player.birthCountry,
            fgq: "goalie",
          });
        }
      } catch (err) {
        console.error(
          `Error fetching roster for team ${team.name}:`,
          err.message
        );
      }
    }
  };
  await addRoster();
  const addPlayerStats = async () => {
    // const testRoster = leagueRoster.slice(0, 5); // Uncomment for testing with a smaller roster
    for (const [idx, player] of leagueRoster.entries()) {
      // Use leagueRoster for full roster
      // for (const [idx, player] of testRoster.entries()) { // Uncomment for testing with a smaller roster
      try {
        const response = await fetch(
          `https://api-web.nhle.com/v1/player/${player.playerId}/landing`
        );
        if (!response.ok) {
          if (response.status === 429) {
            console.error(
              `Rate limited! HTTP 429 for player ${player.playerId}. Consider increasing delay.`
            );
          } else {
            throw new Error(
              `Failed to fetch stats for player ${player.playerId}: ${response.status}`
            );
          }
        }
        const statsData = await response.json();
        const subSeason = statsData?.featuredStats?.regularSeason?.subSeason;
        leagueRoster[idx].stats = subSeason
          ? {
              gamesPlayed: subSeason.gamesPlayed,
              goals: subSeason.goals,
              assists: subSeason.assists,
              points: subSeason.points,
            }
          : {
              gamesPlayed: null,
              goals: null,
              assists: null,
              points: null,
            };
      } catch (err) {
        console.error(
          `Error fetching stats for player ${player.playerId}:`,
          err.message
        );
        leagueRoster[idx].stats = {
          gamesPlayed: null,
          goals: null,
          assists: null,
          points: null,
        };
      }
      if (idx % 10 === 0) {
        console.log(`Processed ${idx + 1} players`);
      }
      await delay(500);
    }

    fs.writeFileSync(
      "nhl_player_stats_2024_2025.json",
      JSON.stringify(leagueRoster, null, 2)
    );
    console.log("Player stats written to nhl_player_stats_2024_2025.json");

    return leagueRoster;
  };
  await addPlayerStats();
}
fetchNHLStats2024_2025();
