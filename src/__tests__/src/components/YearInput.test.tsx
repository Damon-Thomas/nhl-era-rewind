import { render, screen, fireEvent, act } from "@testing-library/react";
import YearInput from "@/components/YearInput";
import { useContext } from "react";
import { SimulationYearContext, LeagueProvider } from "@/context/League";

function ContextConsumer() {
  const { year } = useContext(SimulationYearContext);
  return <div data-testid="year-value">{year}</div>;
}

describe("YearInput", () => {
  test("renders input element", () => {
    render(<YearInput />);
    const input = screen.getByRole("textbox");
    const inputElement = screen.getByPlaceholderText(
      "Type or select season (e.g. 1999-2000)"
    );
    expect(inputElement).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
  test("input value updates on change", () => {
    render(
      <LeagueProvider>
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "2015" } });
    expect((input as HTMLInputElement).value).toBe("2015");
  });
  test("input value updates context on change", () => {
    render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "2015" } });
    fireEvent.submit(input.closest('form')!);
    const yearValue = screen.getByTestId("year-value");
    expect(yearValue.textContent).toBe("2015");
  });
  test("input handles numbers outside of range", () => {
    const { container } = render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    const errorMessage = () => container.querySelector(".text-xs.text-red-600");

    // Out-of-range numeric cases - these should show errors when form is submitted
    const outOfRangeNumbers = ["2026", "9999", "1916", "-9999"];
    outOfRangeNumbers.forEach((val) => {
      fireEvent.change(input, { target: { value: val } });
      // Submit the form to trigger validation
      fireEvent.submit(input.closest("form")!);
      expect(errorMessage()).toHaveTextContent(
        "Select a valid season or enter a year between 1917 and 2024"
      );
    });
  });
  test("input handles non numbers", () => {
    const { container } = render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    const errorMessage = () => container.querySelector(".text-xs.text-red-600");

    // Non-numeric cases - these should show errors when form is submitted
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
      // Submit the form to trigger validation
      fireEvent.submit(input.closest("form")!);
      expect(errorMessage()).toHaveTextContent(
        "Select a valid season or enter a year between 1917 and 2024"
      );
    });
  });
  test("accepts boundary values", () => {
    render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "1917" } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByTestId("year-value").textContent).toBe("1917");
    fireEvent.change(input, { target: { value: "2024" } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByTestId("year-value").textContent).toBe("2024");
  });

  // parseInt handles whitespace correctly, so " 2020 " becomes 2020
  test("handles whitespace", () => {
    render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: " 2020 " } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByTestId("year-value").textContent).toBe("2020");
  });

  test("Rounds down decimal values", () => {
    render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "2020.5" } });
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByTestId("year-value").textContent).toBe("2020");
  });

  test("rejects zero and negative numbers", () => {
    const { container } = render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    const errorMessage = () => container.querySelector(".text-xs.text-red-600");
    ["0", "-1"].forEach((val) => {
      fireEvent.change(input, { target: { value: val } });
      // Submit the form to trigger validation
      fireEvent.submit(input.closest("form")!);
      expect(errorMessage()).toHaveTextContent(
        "Select a valid season or enter a year between 1917 and 2024"
      );
    });
  });

  test("rejects scientific notation", () => {
    const { container } = render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    const errorMessage = () => container.querySelector(".text-xs.text-red-600");
    fireEvent.change(input, { target: { value: "1e10" } });
    // Submit the form to trigger validation
    fireEvent.submit(input.closest("form")!);
    expect(errorMessage()).toHaveTextContent(
      "Select a valid season or enter a year between 1917 and 2024"
    );
  });

  test("processes only last value on rapid input changes", () => {
    render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "2000" } });
    fireEvent.change(input, { target: { value: "2010" } });
    fireEvent.change(input, { target: { value: "2024" } });
    expect(screen.getByTestId("year-value").textContent).toBe("2024");
  });

  test("shows error on empty submit", () => {
    const { container } = render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    const errorMessage = () => container.querySelector(".text-xs.text-red-600");
    fireEvent.change(input, { target: { value: "" } });
    // Submit the form to trigger validation
    fireEvent.submit(input.closest("form")!);
    expect(errorMessage()).toHaveTextContent(
      "Select a valid season or enter a year between 1917 and 2024"
    );
  });

  test("validates pasted input", () => {
    render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "2022" } }); // simulate paste
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByTestId("year-value").textContent).toBe("2022");
  });

  // New tests for dropdown functionality
  test("dropdown opens when input is focused", () => {
    const { container } = render(
      <LeagueProvider>
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);

    const dropdown = container.querySelector("ul");
    expect(dropdown).toBeInTheDocument();
  });

  test("dropdown shows filtered seasons based on input", () => {
    render(
      <LeagueProvider>
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");

    // Use a partial input that won't auto-submit
    fireEvent.change(input, { target: { value: "199" } });

    // Should show seasons that include "199"
    expect(screen.getByText("1999-2000")).toBeInTheDocument();
  });

  test("can select a season from dropdown", () => {
    render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");

    // Use a partial input to keep dropdown open
    fireEvent.change(input, { target: { value: "199" } });
    const seasonOption = screen.getByText("1999-2000");
    fireEvent.mouseDown(seasonOption);

    expect((input as HTMLInputElement).value).toBe("1999-2000");
    expect(screen.getByTestId("year-value").textContent).toBe("2000");
  });

  test("can submit a valid season string", () => {
    render(
      <LeagueProvider>
        <ContextConsumer />
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "2022-2023" } });
    const seasonOption = screen.getByText("2022-2023");
    fireEvent.mouseDown(seasonOption);

    expect(screen.getByTestId("year-value").textContent).toBe("2023");
  });

  test("dropdown closes on blur", async () => {
    const { container } = render(
      <LeagueProvider>
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
    // Use partial input that won't trigger auto-submit
    fireEvent.change(input, { target: { value: "20" } });

    // Dropdown should be open
    expect(container.querySelector("ul")).toBeInTheDocument();

    fireEvent.blur(input);

    // Wait for the timeout in handleBlur
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    expect(container.querySelector("ul")).not.toBeInTheDocument();
  });

  test("dropdown filters correctly with partial matches", () => {
    render(
      <LeagueProvider>
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");

    // Use partial input that won't trigger auto-submit
    fireEvent.change(input, { target: { value: "19" } });

    // Should show seasons that include "19"
    expect(screen.getByText("1917-1918")).toBeInTheDocument();
    expect(screen.getByText("1918-1919")).toBeInTheDocument();
    expect(screen.getByText("1919-1920")).toBeInTheDocument();
  });

  test("error is cleared when typing in input", () => {
    const { container } = render(
      <LeagueProvider>
        <YearInput />
      </LeagueProvider>
    );
    const input = screen.getByRole("textbox");
    const errorMessage = () => container.querySelector(".text-xs.text-red-600");

    // First create an error - use invalid input that won't auto-submit
    fireEvent.change(input, { target: { value: "invalid" } });
    fireEvent.submit(input.closest("form")!);
    expect(errorMessage()).toHaveTextContent(
      "Select a valid season or enter a year between 1917 and 2024"
    );

    // Error should clear when typing - use partial valid input
    fireEvent.change(input, { target: { value: "20" } });
    expect(errorMessage()).toHaveTextContent("");
  });
});
