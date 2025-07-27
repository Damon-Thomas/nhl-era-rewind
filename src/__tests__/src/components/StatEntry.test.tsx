import { render, screen } from "@testing-library/react";
import StatEntry from "@/components/StatEntry";

describe("StatEntry", () => {
  test("renders with string stat", () => {
    render(<StatEntry stat="CAN" side="left" />);
    expect(screen.getByText("CAN")).toBeInTheDocument();
  });
  test("renders with number stat", () => {
    render(<StatEntry stat={2} side="left" />);
    expect(screen.getByText(2)).toBeInTheDocument();
  });
});
