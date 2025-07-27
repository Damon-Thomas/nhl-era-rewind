export default function StatEntry({
  stat,
  side,
  round = 0,
}: {
  stat: string | number | null | undefined;
  side: "left" | "center" | "right";
  round?: number;
}) {
  return (
    <p
      className={`text-${side} px-1 md:px-4 whitespace-nowrap border-1 border-gray-300`}
    >
      {typeof stat === "number" ? stat.toFixed(round) : stat}
    </p>
  );
}
