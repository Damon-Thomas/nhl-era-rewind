export default function LeagueToggle({
  currentLeagueSelector,
  setCurrentLeagueSelector,
}: {
  currentLeagueSelector: "full" | "position";
  setCurrentLeagueSelector: React.Dispatch<
    React.SetStateAction<"full" | "position">
  >;
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">
        {currentLeagueSelector === "full" ? "Full" : "Pos"}
      </label>
      <button
        className={`p-0! rounded-md h-8 w-16 bg-gray-800 `}
        onClick={() =>
          setCurrentLeagueSelector(
            currentLeagueSelector === "full" ? "position" : "full"
          )
        }
      >
        <div className="w-full h-full px-1 py-1 rounded-xl bg- flex items-center justify-start">
          <div
            className={`h-6 w-6  rounded-full bg-white ${
              currentLeagueSelector === "full"
                ? "translate-x-0"
                : "translate-x-8"
            } transition-transform`}
          >
            {" "}
          </div>
        </div>
      </button>
    </div>
  );
}
