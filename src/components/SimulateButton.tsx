import "./SimulateButton.css";

interface SimulateButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function SimulateButton({
  text = "SIMULATE ERA",
  onClick,
  disabled = false,
  className = "",
}: SimulateButtonProps) {
  return (
    <button
      className={`simulate-button ${className} ${
        disabled ? "disabled" : ""
      } h-16 p-0! flex flex-1 justify-center items-center relative overflow-hidden rounded-lg border-3! border-black! bg-white cursor-pointer min-h-16`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <div className="gradient-overlay absolute"></div>
      <span className="button-text text-center z-10 text-black font-black text-xl">
        {disabled ? "Simulating..." : text}
      </span>
    </button>
  );
}
