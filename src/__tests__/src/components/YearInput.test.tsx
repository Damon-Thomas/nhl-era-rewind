import { render, screen, fireEvent } from "@testing-library/react";
import YearInput from "@/components/YearInput";
import { useContext } from "react";
import {
  SimulationYearContext,
  SimulationYearProvider,
} from "@/context/SimulationYear";

function ContextConsumer() {
  const { year } = useContext(SimulationYearContext);
  return <div data-testid="year-value">{year}</div>;
}

describe("YearInput", () => {
  test("renders input element", () => {
    render(<YearInput />);
    const input = screen.getByRole("spinbutton");
    const inputElement = screen.getByPlaceholderText("Year 1917 - 2025");
    expect(inputElement).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
  test("submit button renders", () => {
    render(<YearInput />);
    const button = screen.getByText("Set Year");
    expect(button).toBeInTheDocument();
  });
  test("input value updates on change", () => {
    render(<YearInput />);
    const input = screen.getByRole("spinbutton");
    fireEvent.change(input, { target: { value: "2015" } });
    expect((input as HTMLInputElement).value).toBe("2015");
  });
  test("input value updates context on submit", () => {
    render(
      <SimulationYearProvider>
        <ContextConsumer />
        <YearInput />
      </SimulationYearProvider>
    );
    const input = screen.getByRole("spinbutton");
    const submitButton = screen.getByText("Set Year");
    fireEvent.change(input, { target: { value: "2015" } });
    fireEvent.click(submitButton);
    const yearValue = screen.getByTestId("year-value");
    expect(yearValue.textContent).toBe("2015");
  });
  test("input handles numbers outside of range", () => {
    const { container } = render(
      <SimulationYearProvider>
        <ContextConsumer />
        <YearInput />
      </SimulationYearProvider>
    );
    const input = screen.getByRole("spinbutton");
    const submitButton = screen.getByText("Set Year");
    const errorMessage = () => container.querySelector(".text-xs.text-red-600");

    // Out-of-range numeric cases
    const outOfRangeNumbers = ["2026", "9999", "1916", "-9999"];
    outOfRangeNumbers.forEach((val) => {
      fireEvent.change(input, { target: { value: val } });
      fireEvent.click(submitButton);
      expect(errorMessage()).toHaveTextContent(
        "Year must be between 1917 and 2024"
      );
    });
  });
  test("input handles non numbers", () => {
    const { container } = render(
      <SimulationYearProvider>
        <ContextConsumer />
        <YearInput />
      </SimulationYearProvider>
    );
    const input = screen.getByRole("spinbutton");
    const submitButton = screen.getByText("Set Year");
    const errorMessage = () => container.querySelector(".text-xs.text-red-600");

    // Non-numeric cases
    const nonNumbers = [
      "abc",
      "",
      "19a2",
      "null",
      "undefined",
      "!@#",
      " ",
      "throw error",
    ];
    nonNumbers.forEach((val) => {
      fireEvent.change(input, { target: { value: val } });
      fireEvent.click(submitButton);
      expect(errorMessage()).toHaveTextContent(
        "Year must be between 1917 and 2024"
      );
    });
  });
  test("accepts boundary values", () => {
    render(
      <SimulationYearProvider>
        <ContextConsumer />
        <YearInput />
      </SimulationYearProvider>
    );
    const input = screen.getByRole("spinbutton");
    const submitButton = screen.getByText("Set Year");
    fireEvent.change(input, { target: { value: "1917" } });
    fireEvent.click(submitButton);
    expect(screen.getByTestId("year-value").textContent).toBe("1917");
    fireEvent.change(input, { target: { value: "2024" } });
    fireEvent.click(submitButton);
    expect(screen.getByTestId("year-value").textContent).toBe("2024");
  });

  // White space text evaluated as NaN so it should default to 2025
  test("handles whitespace", () => {
    render(
      <SimulationYearProvider>
        <ContextConsumer />
        <YearInput />
      </SimulationYearProvider>
    );
    const input = screen.getByRole("spinbutton");
    const submitButton = screen.getByText("Set Year");
    fireEvent.change(input, { target: { value: " 2020 " } });
    fireEvent.click(submitButton);
    expect(screen.getByTestId("year-value").textContent).toBe("2025");
  });

  test("Rounds down decimal values", () => {
    render(
      <SimulationYearProvider>
        <ContextConsumer />
        <YearInput />
      </SimulationYearProvider>
    );
    const input = screen.getByRole("spinbutton");
    const submitButton = screen.getByText("Set Year");
    fireEvent.change(input, { target: { value: "2020.5" } });
    fireEvent.click(submitButton);
    expect(screen.getByTestId("year-value").textContent).toBe("2020");
  });

  test("rejects zero and negative numbers", () => {
    const { container } = render(
      <SimulationYearProvider>
        <ContextConsumer />
        <YearInput />
      </SimulationYearProvider>
    );
    const input = screen.getByRole("spinbutton");
    const submitButton = screen.getByText("Set Year");
    const errorMessage = () => container.querySelector(".text-xs.text-red-600");
    ["0", "-1"].forEach((val) => {
      fireEvent.change(input, { target: { value: val } });
      fireEvent.click(submitButton);
      expect(errorMessage()).toHaveTextContent(
        "Year must be between 1917 and 2024"
      );
    });
  });

  test("rejects scientific notation", () => {
    const { container } = render(
      <SimulationYearProvider>
        <ContextConsumer />
        <YearInput />
      </SimulationYearProvider>
    );
    const input = screen.getByRole("spinbutton");
    const submitButton = screen.getByText("Set Year");
    const errorMessage = () => container.querySelector(".text-xs.text-red-600");
    fireEvent.change(input, { target: { value: "1e10" } });
    fireEvent.click(submitButton);
    expect(errorMessage()).toHaveTextContent(
      "Year must be between 1917 and 2024"
    );
  });

  test("processes only last value on rapid input changes", () => {
    render(
      <SimulationYearProvider>
        <ContextConsumer />
        <YearInput />
      </SimulationYearProvider>
    );
    const input = screen.getByRole("spinbutton");
    const submitButton = screen.getByText("Set Year");
    fireEvent.change(input, { target: { value: "2000" } });
    fireEvent.change(input, { target: { value: "2010" } });
    fireEvent.change(input, { target: { value: "2024" } });
    fireEvent.click(submitButton);
    expect(screen.getByTestId("year-value").textContent).toBe("2024");
  });

  test("shows error on empty submit", () => {
    const { container } = render(
      <SimulationYearProvider>
        <ContextConsumer />
        <YearInput />
      </SimulationYearProvider>
    );
    const input = screen.getByRole("spinbutton");
    const submitButton = screen.getByText("Set Year");
    const errorMessage = () => container.querySelector(".text-xs.text-red-600");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(submitButton);
    expect(errorMessage()).toHaveTextContent(
      "Year must be between 1917 and 2024"
    );
  });

  test("validates pasted input", () => {
    render(
      <SimulationYearProvider>
        <ContextConsumer />
        <YearInput />
      </SimulationYearProvider>
    );
    const input = screen.getByRole("spinbutton");
    const submitButton = screen.getByText("Set Year");
    fireEvent.change(input, { target: { value: "2022" } }); // simulate paste
    fireEvent.click(submitButton);
    expect(screen.getByTestId("year-value").textContent).toBe("2022");
  });
});
