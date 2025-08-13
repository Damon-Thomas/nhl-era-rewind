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
        onClick={(e) => {
          e.stopPropagation();
          setLeagueSelectionVisible((prev) => !prev);
        }}
        className={`  ${
          leagueSelectionVisible ? "invisible" : " visible !border-slate-800"
        }`}
      >
        {leagueSelection}
      </button>
      <div className="absolute  -left-0  z-10 flex items-center justify-center">
        {selectionOptions.map((option) => (
          <button
            key={option}
            onClick={(e) => {
              e.stopPropagation();
              setLeagueSelection(option as 10 | 25 | 50 | 100);
              setLeagueSelectionVisible(false);
            }}
            className={` ${
              leagueSelection === option
                ? "!border-slate-200"
                : "!border-slate-800"
            } ${leagueSelectionVisible ? "" : "hidden"}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
