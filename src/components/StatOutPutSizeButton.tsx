import { useState, type SetStateAction } from "react";

export default function StatOutputSizeButton({
  leagueSelection,
  setLeagueSelection,
}: {
  leagueSelection: number;
  setLeagueSelection: React.Dispatch<SetStateAction<10 | 25 | 50 | 100>>;
}) {
  const [leagueSelectionVisible, setLeagueSelectionVisible] = useState(false);
  const selectionOptions = [10, 25, 50, 100];
  return (
    <div className="flex flex-col relative">
      <button
        onClick={() => {
          setLeagueSelectionVisible((prev) => !prev);
        }}
      >
        {leagueSelection}
      </button>
      <div className="absolute top-full -right-0 bg-gray-800 bg-opacity-50 z-10 flex items-center justify-center">
        {selectionOptions.map((option) => (
          <button
            key={option}
            onClick={() => {
              setLeagueSelection(option as 10 | 25 | 50 | 100);
              setLeagueSelectionVisible(false);
            }}
            className={`${
              leagueSelection === option ? "bg-blue-500" : "bg-gray-300"
            } p-2 m-1 ${leagueSelectionVisible ? "" : "hidden"}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
