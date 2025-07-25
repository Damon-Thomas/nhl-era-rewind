// node src/data/handlers/fetchTeamsByYear.js
import fs from "fs";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));
// const startYear = 1918; // Uncomment for full history
const startYear = 1918; // Start from 2020 for recent seasons test
const endYear = 2025;
let currentYear = startYear;
const teamList = [];
async function fetchTeamsByYear(year) {
  try {
    const response = await fetch(
      `https://api-web.nhle.com/v1/standings/${year}-02-01`
    );
    if (!response.ok) {
      throw new Error(`Fetch failed: ${response.status}`);
    }
    const data = await response.json();
    return data.standings || [];
  } catch (err) {
    console.error("Error fetching NHL teams:", err.message);
    throw new Error("Failed to fetch NHL teams");
  }
}

async function fetchAllTeams() {
  while (currentYear <= endYear) {
    try {
      const teams = await fetchTeamsByYear(currentYear);
      const yearTeams = { year: currentYear, teams: [] };
      teams.map((team) =>
        yearTeams.teams.push({
          name: team.teamName.default,
          abbreviation: team.teamAbbrev.default,
          logo: team.teamLogo,
        })
      );
      teamList.push(yearTeams);
      console.log(`Fetched teams for ${currentYear}`);
    } catch (error) {
      console.error(`Error fetching teams for ${currentYear}:`, error.message);
    }
    currentYear++;
    await delay(1000); // Delay to avoid rate limiting
  }
  fs.writeFileSync(
    "src/data/teams_by_year.json",
    JSON.stringify(teamList, null, 2)
  );
}

fetchAllTeams();
