export default function StatEntry({
  stat,
  side,
  round = 0,
  size = "lg",
}: {
  stat: string | number | null | undefined;
  side: "left" | "center" | "right";
  round?: number;
  size?: "sm" | "md" | "lg";
}) {
  if (stat === null || stat === undefined) {
    return (
      <p
        className={`text-${side} ${
          size === "md" ? "w-auto" : size === "sm" ? "w-auto" : ""
        }  whitespace-nowrap px-1 border-1 border-gray-300`}
      >
        N/A
      </p>
    );
  }
  return (
    <p
      className={`text-${side} ${
        size === "md" ? "w-auto" : size === "sm" ? "w-auto" : ""
      }  whitespace-nowrap px-1 border-1 border-gray-300`}
    >
      {typeof stat === "number" ? stat.toFixed(round) : stat}
    </p>
  );
}
