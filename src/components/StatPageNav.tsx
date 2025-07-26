export default function StatPageNav({
  pageChangeHandler,
  page,
}: {
  pageChangeHandler: (incOrDec: string) => void;
  page: number;
}) {
  return (
    <div className="col-span-7 flex">
      <div className="" onClick={() => pageChangeHandler("dec")}></div>
      <div className="">{page}</div>
      <div className="" onClick={() => pageChangeHandler("inc")}></div>
    </div>
  );
}
