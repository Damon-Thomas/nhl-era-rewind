import populationDataJson from "@/data/staticData/filtered_population.json";
import growthRateDataJson from "@/data/staticData/growthrates.json";
// Ensure populationData is of type populationDataType
const populationData: populationDataType = populationDataJson;
const growthRateData: growthRateDataType = growthRateDataJson;
export type populationDataType = {
  [key: string]: populationEntry[];
};
export type populationEntry = {
  Country: string;
  Population: number;
};
export type GrowthRateEntry = {
  Country: string;
  GrowthRate: number;
};

export type growthRateDataType = {
  [key: string]: GrowthRateEntry[];
};

function formatYear(year: number): string {
  const firstYearInRange = (year - 1).toString();
  const yearString = year.toString().slice(-2);
  return `${firstYearInRange}-${yearString}`;
}
export default function getPopulationByYear(
  year: number
): populationEntry[] | [] {
  const formattedYear = formatYear(year);
  if (year >= 1961) {
    if (year >= 2024) {
      // For 2024 and later, return the most recent available data (2023-24)
      return populationData["2023-24"] || [];
    }
    // Cast populationData to populationDataType if necessary
    return populationData[formattedYear] || [];
    return populationData[formattedYear] || [];
  } else {
    const yearsFromLastData = 1961 - year;
    // Adjust populations based on growth rates for years before 1961
    const adjustedPopulations: populationEntry[] = [];
    const lastAvailableData = populationData["1960-61"];
    const growthRates = growthRateData["GrowthRates"];
    if (lastAvailableData && growthRates) {
      lastAvailableData.forEach((entry) => {
        const growthRateEntry = growthRates.find(
          (gr) => gr.Country === entry.Country
        );
        if (growthRateEntry) {
          const adjustedPopulation = Math.round(
            entry.Population /
              Math.pow(1 + growthRateEntry.GrowthRate / 100, yearsFromLastData)
          );
          adjustedPopulations.push({
            Country: entry.Country,
            Population: adjustedPopulation,
          });
        }
      });
      return adjustedPopulations;
    }
  }
  return [];
}
