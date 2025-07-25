import fs from "fs";

const rawData = JSON.parse(
  fs.readFileSync("nhl_nationality_data.json", "utf8")
);

const groupedData = rawData.reduce((acc, { Season, Nationality, Players }) => {
  if (!acc[Season]) acc[Season] = [];
  acc[Season].push({ Nationality, Players });
  return acc;
}, {});

fs.writeFileSync(
  "nhl_nationality_grouped.json",
  JSON.stringify(groupedData, null, 2)
);

console.log("Data grouped by season and saved.");
