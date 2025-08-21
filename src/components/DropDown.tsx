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
      <div
        className="ddbutton w-full flex justify-between items-center cursor-pointer rounded-lg border border-transparent px-5 py-2 text-base font-medium font-inherit bg-[#1a1a1a] transition-colors duration-300 hover:border-[#646cff] focus:outline-4 focus:outline-auto focus:outline-[#646cff]"
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
      </div>

      <div
        className={`grid w-full overflow-hidden transition-all duration-500 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid [grid-template-columns:1fr_auto_auto_auto_auto_auto_auto]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
