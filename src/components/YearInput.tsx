import { SimulationYearContext } from "@/context/SimulationYear";
import { useContext, useState } from "react";

export default function YearInput() {
  const { year, setYear } = useContext(SimulationYearContext);
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = parseInt(inputValue);
    if (isNaN(value) || value < 1917 || value > 2024) {
      setError("Year must be between 1917 and 2024");
      return;
    }
    setError("");
    setYear(value ? value : 2025);
  }

  return (
    <form action="" className="flex flex-col gap-2 ">
      <div className="flex gap-2 md:gap-4">
        <input
          type="number"
          className="year-input min-w-52 px-2 py-1 border rounded"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          min="1917"
          max="2024"
          placeholder="Year 1917 - 2025"
        />
        <button onClick={handleSubmit}>Set Year</button>
      </div>
      <p className="text-xs text-red-600">{error}</p>
      <p>Current Simulation Year: {year}</p>
    </form>
  );
}
