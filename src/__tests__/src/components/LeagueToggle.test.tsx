import { render, screen } from "@testing-library/react";
import LeagueToggle from "@/components/LeagueToggle";

const mockSetCurrentLeagueSelector = jest.fn();
const mockCurrentLeagueSelector = "full";

describe("LeagueToggle", () => {
  test("Renders toggle button", () => {
    render(
      <LeagueToggle
        currentLeagueSelector={mockCurrentLeagueSelector}
        setCurrentLeagueSelector={mockSetCurrentLeagueSelector}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("p-0! rounded-md h-8 w-16 bg-gray-800");
  });
  test("Renders label", () => {
    render(
      <LeagueToggle
        currentLeagueSelector={mockCurrentLeagueSelector}
        setCurrentLeagueSelector={mockSetCurrentLeagueSelector}
      />
    );
    const label = screen.getByText("Full");
    expect(label).toHaveClass("text-sm font-medium");
  });
  test("", () => {
    render(
      <LeagueToggle
        currentLeagueSelector={mockCurrentLeagueSelector}
        setCurrentLeagueSelector={mockSetCurrentLeagueSelector}
      />
    );
    const button = screen.getByRole("button");
    button.click();
    expect(mockSetCurrentLeagueSelector).toHaveBeenCalledWith("position");
  });
});
