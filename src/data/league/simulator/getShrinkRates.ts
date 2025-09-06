import type { populationEntry } from "../populationsByYear";

type shrinkRatesType = {
  [key: string]: number;
};
export function GetShrinkRates({
  currentPopulations,
  simulatedPopulations,
}: {
  currentPopulations: populationEntry[];
  simulatedPopulations: populationEntry[];
}) {
  const shrinkRates = {} as shrinkRatesType;
  simulatedPopulations.map((simulatedPopulation) => {
    const currentPopulation = currentPopulations.find(
      (Country) => Country.Country === simulatedPopulation.Country
    );
    if (!currentPopulation) {
      console.error(
        "Error finding current population for country:",
        simulatedPopulation
      );
      return; // initialLeague is what it used to be;
    }
    const shrinkRate =
      simulatedPopulation.Population / currentPopulation.Population;
    shrinkRates[simulatedPopulation.Country] =
      shrinkRate <= 0.9 ? shrinkRate : 1;
  });
  return shrinkRates;
}
