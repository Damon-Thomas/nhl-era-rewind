import { useState } from "react";
import Chevron from "./Chevron";
import StatOutputSizeButton from "./StatOutPutSizeButton";

export default function StatsDropDown({
  title,
  children,
  leagueSelection,
  setLeagueSelection,
  setPage,
}: {
  title: string;
  children: React.ReactNode;
  leagueSelection: 10 | 25 | 50 | 100;
  setLeagueSelection: React.Dispatch<React.SetStateAction<10 | 25 | 50 | 100>>;
  setPage: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left w-full h-fit">
      <button
        className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        <div className="flex justify-start items-center gap-4">
          {title}
          <StatOutputSizeButton
            leagueSelection={leagueSelection}
            setLeagueSelection={(val) => {
              setLeagueSelection(val);
              setPage();
            }}
          />
        </div>
        <Chevron down={open} />
      </button>

      <div
        className={`grid w-full overflow-hidden transition-all duration-500 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid [grid-template-columns:repeat(7,auto)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
