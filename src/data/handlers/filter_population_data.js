import fs from "fs";
import path from "path";
import readline from "readline";

// List of countries relevant to your NHL nationality data
const relevantCountries = new Set([
  "Canada",
  "United States",
  "Sweden",
  "Russian Federation", // Russia in CSV
  "Finland",
  "Czechia", // Czech Republic in CSV
  "Slovak Republic", // Slovakia in CSV
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
  "United Kingdom",
  "Uzbekistan",
]);

// Map CSV country names to the names used in your NHL data
const countryNameMapping = {
  "Russian Federation": "Russia",
  Czechia: "Czech Republic",
  "Slovak Republic": "Slovakia",
  // Add more mappings as needed
};

// Input and output file paths
const inputCsvPath = path.join("src/data/staticData/population.csv");
const outputJsonPath = path.join(
  "src/data/staticData/filtered_population.json"
);

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

    // Use mapped name if available, otherwise use original name
    const mappedCountryName = countryNameMapping[country] || country;
    result[seasonKey].push({
      Country: mappedCountryName,
      Population: population,
    });
  }

  fs.writeFileSync(outputJsonPath, JSON.stringify(result, null, 2));
  console.log("Filtered population data written to:", outputJsonPath);
};

parseCsv();
