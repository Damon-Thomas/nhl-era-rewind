import { useState } from "react";
import {
  sortedRoster,
  sortedForwards,
  sortedDefensemen,
  sortedGoalies,
} from "./preSortedLeague";

export const [skaterRoster, setSkaterRoster] = useState(sortedRoster);
export const [goalieRoster, setGoalieRoster] = useState(sortedGoalies);
export const [forwardsRoster, setForwardsRoster] = useState(sortedForwards);
export const [defensemenRoster, setDefensemenRoster] =
  useState(sortedDefensemen);

// Track sort direction and last sort field for each roster
const [skaterSort, setSkaterSort] = useState<{ field: string; asc: boolean }>({
  field: "points",
  asc: false,
});
const [goalieSort, setGoalieSort] = useState<{ field: string; asc: boolean }>({
  field: "wins",
  asc: false,
});
const [forwardsSort, setForwardsSort] = useState<{
  field: string;
  asc: boolean;
}>({ field: "points", asc: false });
const [defensemenSort, setDefensemenSort] = useState<{
  field: string;
  asc: boolean;
}>({ field: "points", asc: false });

export function handleSkaterSort(
  sortBy:
    | "points"
    | "goals"
    | "assists"
    | "gamesPlayed"
    | "name"
    | "position"
    | "nationality"
) {
  setSkaterSort((prev) => {
    const asc = prev.field === sortBy ? !prev.asc : false;
    const sorted = [...skaterRoster].sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") {
        const aName = (a.firstName + " " + a.lastName).toLowerCase();
        const bName = (b.firstName + " " + b.lastName).toLowerCase();
        cmp = aName.localeCompare(bName);
      } else if (sortBy === "position") {
        cmp = a.position.localeCompare(b.position);
      } else if (sortBy === "nationality") {
        cmp = a.nationality.localeCompare(b.nationality);
      } else {
        const aStat = a.stats[sortBy] ?? 0;
        const bStat = b.stats[sortBy] ?? 0;
        cmp = bStat - aStat;
      }
      return asc ? -cmp : cmp;
    });
    setSkaterRoster(sorted);
    return { field: sortBy, asc };
  });
}

export function handleGoalieSort(
  sortBy:
    | "wins"
    | "savePercentage"
    | "goalsAgainstAvg"
    | "gamesPlayed"
    | "name"
    | "position"
    | "nationality"
) {
  setGoalieSort((prev) => {
    const asc = prev.field === sortBy ? !prev.asc : false;
    const sorted = [...goalieRoster].sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") {
        const aName = (a.firstName + " " + a.lastName).toLowerCase();
        const bName = (b.firstName + " " + b.lastName).toLowerCase();
        cmp = aName.localeCompare(bName);
      } else if (sortBy === "position") {
        cmp = a.position.localeCompare(b.position);
      } else if (sortBy === "nationality") {
        cmp = a.nationality.localeCompare(b.nationality);
      } else {
        const aStat = a.stats[sortBy] ?? 0;
        const bStat = b.stats[sortBy] ?? 0;
        cmp = bStat - aStat;
      }
      return asc ? -cmp : cmp;
    });
    setGoalieRoster(sorted);
    return { field: sortBy, asc };
  });
}

export function handleForwardsSort(
  sortBy:
    | "points"
    | "goals"
    | "assists"
    | "gamesPlayed"
    | "name"
    | "position"
    | "nationality"
) {
  setForwardsSort((prev) => {
    const asc = prev.field === sortBy ? !prev.asc : false;
    const sorted = [...forwardsRoster].sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") {
        const aName = (a.firstName + " " + a.lastName).toLowerCase();
        const bName = (b.firstName + " " + b.lastName).toLowerCase();
        cmp = aName.localeCompare(bName);
      } else if (sortBy === "position") {
        cmp = a.position.localeCompare(b.position);
      } else if (sortBy === "nationality") {
        cmp = a.nationality.localeCompare(b.nationality);
      } else {
        const aStat = a.stats[sortBy] ?? 0;
        const bStat = b.stats[sortBy] ?? 0;
        cmp = bStat - aStat;
      }
      return asc ? -cmp : cmp;
    });
    setForwardsRoster(sorted);
    return { field: sortBy, asc };
  });
}

export function handleDefensemenSort(
  sortBy:
    | "points"
    | "goals"
    | "assists"
    | "gamesPlayed"
    | "name"
    | "position"
    | "nationality"
) {
  setDefensemenSort((prev) => {
    const asc = prev.field === sortBy ? !prev.asc : false;
    const sorted = [...defensemenRoster].sort((a, b) => {
      let cmp = 0;
      if (sortBy === "name") {
        const aName = (a.firstName + " " + a.lastName).toLowerCase();
        const bName = (b.firstName + " " + b.lastName).toLowerCase();
        cmp = aName.localeCompare(bName);
      } else if (sortBy === "position") {
        cmp = a.position.localeCompare(b.position);
      } else if (sortBy === "nationality") {
        cmp = a.nationality.localeCompare(b.nationality);
      } else {
        const aStat = a.stats[sortBy] ?? 0;
        const bStat = b.stats[sortBy] ?? 0;
        cmp = bStat - aStat;
      }
      return asc ? -cmp : cmp;
    });
    setDefensemenRoster(sorted);
    return { field: sortBy, asc };
  });
}
