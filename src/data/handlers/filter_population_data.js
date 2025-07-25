import fs from "fs";
import path from "path";
import readline from "readline";

// List of countries relevant to your NHL nationality data
const relevantCountries = new Set([
  "Canada",
  "United States",
  "Sweden",
  "Russia",
  "Finland",
  "Czech Republic",
  "Slovakia",
  "Belarus",
  "Germany",
  "Austria",
  "Denmark",
  "Slovenia",
  "Kazakhstan",
  "Ukraine",
  "Lithuania",
  "Norway",
  "Switzerland",
  "Latvia",
  "South Korea",
  "France",
  "Croatia",
  "Netherlands",
  "Australia",
]);

// Input and output file paths
const inputCsvPath = path.join("population.csv");
const outputJsonPath = path.join("filtered_population.json");

const parseCsv = async () => {
  const fileStream = fs.createReadStream(inputCsvPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const result = {}; // final structure: { "1960-61": [ { Country, Population } ] }

  for await (const line of rl) {
    const [country, , yearStr, popStr] = line.split(",");
    const year = parseInt(yearStr, 10);
    const population = parseInt(popStr, 10);

    if (!relevantCountries.has(country)) continue;
    if (isNaN(year) || isNaN(population)) continue;

    const seasonKey = `${year}-${(year + 1).toString().slice(2)}`;
    if (!result[seasonKey]) result[seasonKey] = [];

    result[seasonKey].push({ Country: country, Population: population });
  }

  fs.writeFileSync(outputJsonPath, JSON.stringify(result, null, 2));
  console.log("Filtered population data written to:", outputJsonPath);
};

parseCsv();
