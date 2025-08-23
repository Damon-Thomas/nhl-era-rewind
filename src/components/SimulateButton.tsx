import React from "react";
import "./SimulateButton.css";

interface SimulateButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const SimulateButton: React.FC<SimulateButtonProps> = ({
  text = "SIMULATE ERA",
  onClick,
  disabled = false,
  className = "",
}) => {
  return (
    <button
      className={`simulate-button ${className} ${
        disabled ? "disabled" : ""
      } h-16 p-0! flex justify-center items-center relative overflow-hidden rounded-lg border-2 border-black bg-white cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <div className="gradient-overlay absolute"></div>
      <span className="button-text text-center z-10 text-black font-black text-xl">
        {text}
      </span>
    </button>
  );
};

export default SimulateButton;
