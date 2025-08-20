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
  test("renders with null stat", () => {
    render(<StatEntry stat={null} side="left" />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
  test("renders with undefined stat", () => {
    render(<StatEntry stat={undefined} side="left" />);
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });
  test("renders with rounded number stat to 2", () => {
    render(<StatEntry stat={2.12345} side="left" round={2} />);
    expect(screen.getByText("2.12")).toBeInTheDocument();
  });
  test("renders with rounded number stat to 3", () => {
    render(<StatEntry stat={2.12345} side="left" round={3} />);
    expect(screen.getByText("2.123")).toBeInTheDocument();
    expect(screen.queryByText("2.1234")).not.toBeInTheDocument();
  });
  test("round renders integer number stat to 3 decimals", () => {
    render(<StatEntry stat={2} side="left" round={3} />);
    expect(screen.getByText("2.000")).toBeInTheDocument();
  });
  test("renders with different side", () => {
    render(<StatEntry stat="USA" side="right" />);
    const element = screen.getByText("USA");
    expect(element).toHaveClass("text-right");
    expect(element).toHaveClass(
      "whitespace-nowrap px-1 border-1 border-gray-300"
    );
  });
});
