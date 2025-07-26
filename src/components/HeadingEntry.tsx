export default function HeadingEntry({
  label,
  sortHandler,
  side = "center",
}: {
  label: string;
  sortHandler?: () => void;
  side?: "left" | "center" | "right";
}) {
  return (
    <p
      onClick={sortHandler}
      className={`text-${side} px-1 md:px-4 font-extrabold border-x-2 border-y-4 text-black border-gray-800 bg-neutral-300 hover:bg-neutral-400 cursor-pointer transition-colors duration-200`}
    >
      {label}
    </p>
  );
}
