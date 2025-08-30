import nationalityDataJsonRaw from "@/data/staticData/nhl_nationality_grouped.json";
import { formatYear } from "./populationsByYear";

const nationalityDataJson: NationalityDataType =
  nationalityDataJsonRaw as NationalityDataType;

type NationalityDataType = {
  [key: string]: NationalityEntry[];
};
type NationalityEntry = {
  Nationality: string;
  Players: number;
};

export default function getLeagueNationalityByYear(year: number) {
  const formattedYear = formatYear(year);
  return nationalityDataJson[formattedYear] ?? [];
}
