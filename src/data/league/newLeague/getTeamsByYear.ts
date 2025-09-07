import teamDataJsonRaw from "@/data/staticData/teams_by_year.json";

const teamDataJson: TeamDataType = teamDataJsonRaw as TeamDataType;

type TeamDataType = TeamItem[];

type TeamItem = {
  year: number;
  teams: TeamEntry[];
};

export type TeamEntry = {
  name: string;
  abbreviation: string;
  logo: string;
};

export default function getTeamsByYear(year: number) {
  const teams = teamDataJson.find((item) => item.year === year);
  return teams ? teams.teams : [];
}
