export default function StatPageNav({
  pageChangeHandler,
  page,
  type,
  maxPage,
}: {
  pageChangeHandler: (
    type: "skater" | "goalie" | "forwards" | "defensemen",
    page: number,
    incOrDec: "inc" | "dec"
  ) => void;
  page: number;
  type: "skater" | "goalie" | "forwards" | "defensemen";
  maxPage: number;
}) {
  return (
    <div className="col-span-7 flex w-full">
      <div
        className="flex-1 m-2 bg-slate-600 hover:bg-slate-400 cursor-pointer rounded text-center font-bold text-lg"
        onClick={() => pageChangeHandler(type, page, "dec")}
      >
        Prev
      </div>
      <div className="w-10 my-2 font-bold text-lg text-center">
        {page === maxPage && maxPage > 1 ? "max" : page}
      </div>
      <div
        className="flex-1 m-2 bg-slate-600 hover:bg-slate-400 cursor-pointer rounded text-center font-bold text-lg"
        onClick={() => pageChangeHandler(type, page, "inc")}
      >
        Next
      </div>
    </div>
  );
}
