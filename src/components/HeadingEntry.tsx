export default function HeadingEntry({
  label,
  sortHandler,
  side = "center",
  size = "lg",
}: {
  label: string;
  sortHandler?: () => void;
  side?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <p
      onClick={sortHandler}
      className={`text-${side} ${
        size === "md" ? "w-10" : size === "sm" ? "w-10" : ""
      }  font-extrabold px-1 border-x-2 border-y-4 text-black border-gray-800 bg-neutral-300 hover:bg-neutral-400 cursor-pointer transition-colors duration-200`}
    >
      {label}
    </p>
  );
}
