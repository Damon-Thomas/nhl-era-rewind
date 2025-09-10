import { SimulationYearContext } from "@/context/League";
import { useContext, useState, useRef } from "react";

const seasons = Array.from({ length: 2025 - 1917 }, (_, i) => {
  const start = 1917 + i;
  return `${start}-${start + 1}`;
});

export default function YearInput() {
  const { year, setYear } = useContext(SimulationYearContext);
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter seasons based on input
  const filteredSeasons = seasons.filter((season) =>
    season.toLowerCase().includes(inputValue.toLowerCase())
  );

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setDropdownOpen(true);
    setError("");
  }

  function handleSeasonSelect(season: string) {
    setInputValue(season);
    setDropdownOpen(false);
    setError("");
    // Set year to the second year of the selected season
    const startYear = parseInt(season.split("-")[1]);
    setYear(startYear);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Accept either a valid season string or a valid year
    if (seasons.includes(inputValue)) {
      handleSeasonSelect(inputValue);
      return;
    }
    const value = parseInt(inputValue);
    if (isNaN(value) || value < 1917 || value > 2024) {
      setError("Select a valid season or enter a year between 1917 and 2024");
      return;
    }
    setError("");
    setYear(value);
    setDropdownOpen(false);
  }

  function handleBlur(e: React.FocusEvent) {
    // Delay closing dropdown to allow click event to register
    setTimeout(() => setDropdownOpen(false), 100);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex gap-2 md:gap-4 relative">
        <input
          ref={inputRef}
          type="text"
          className="year-input min-w-52 px-2 py-1 border rounded"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setDropdownOpen(true)}
          onBlur={handleBlur}
          placeholder="Type or select season (e.g. 1999-2000)"
          autoComplete="off"
        />
        <button type="submit">Set Year</button>
        {dropdownOpen && filteredSeasons.length > 0 && (
          <ul className="bg-[var(--black)] absolute top-full left-0 z-10 border rounded shadow max-h-48 overflow-y-auto w-full mt-1">
            {filteredSeasons.map((season) => (
              <li
                key={season}
                className="px-2 py-1 cursor-pointer hover:bg-[var(--darkGrey)]"
                onMouseDown={() => handleSeasonSelect(season)}
              >
                {season}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-xs text-red-600">{error}</p>
      <p>Current Simulation Year: {year}</p>
    </form>
  );
}
