import SimulateButton from "@/components/SimulateButton";
import { render, screen } from "@testing-library/react";

describe("SimulateButton", () => {
  test("renders button element", () => {
    render(<SimulateButton />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("renders button text", () => {
    render(<SimulateButton />);
    const text = screen.getByText("SIMULATE ERA");
    expect(text).toBeInTheDocument();
  });
});
