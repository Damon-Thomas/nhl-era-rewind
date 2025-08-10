export default function Chevron({ down = false }: { down?: boolean }) {
  return (
    <svg
      className="inline-block w-6 h-6 transform transition-transform duration-800"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      style={{ transform: down ? "rotateX(0deg)" : "rotateX(180deg)" }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
