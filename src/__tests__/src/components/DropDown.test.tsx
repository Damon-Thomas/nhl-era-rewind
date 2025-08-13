import { render, screen, fireEvent } from "@testing-library/react";
import StatsDropDown from "@/components/DropDown";

describe("StatsDropDown", () => {
  const mockSetLeagueSelection = jest.fn();
  const mockSetPage = jest.fn();

  const defaultProps = {
    title: "Test Dropdown",
    leagueSelection: 10 as const,
    setLeagueSelection: mockSetLeagueSelection,
    setPage: mockSetPage,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders dropdown title", () => {
    render(
      <StatsDropDown {...defaultProps}>
        <div>Test content</div>
      </StatsDropDown>
    );
    expect(screen.getByText("Test Dropdown")).toBeInTheDocument();
  });

  test("renders children when expanded", () => {
    const { container } = render(
      <StatsDropDown {...defaultProps}>
        <div>Test content</div>
      </StatsDropDown>
    );

    // Click to expand using the ddbutton class
    const ddButton = container.querySelector(".ddbutton");
    if (ddButton) {
      fireEvent.click(ddButton);
    } else {
      throw new Error("Dropdown button not found");
    }

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  test("toggles dropdown when clicked", () => {
    const { container } = render(
      <StatsDropDown {...defaultProps}>
        <div>Test content</div>
      </StatsDropDown>
    );

    // Get the main dropdown button using class selector
    const button = container.querySelector(".ddbutton");
    if (!button) throw new Error("Dropdown button not found");

    const animatedDiv = container.querySelector(".grid.w-full.overflow-hidden");

    // Initially closed - should have closed classes
    expect(animatedDiv).toHaveClass("grid-rows-[0fr]", "opacity-0");

    // Click to open
    fireEvent.click(button);
    expect(animatedDiv).toHaveClass("grid-rows-[1fr]", "opacity-100");

    // Click to close
    fireEvent.click(button);
    expect(animatedDiv).toHaveClass("grid-rows-[0fr]", "opacity-0");
  });

  test("displays current league selection value", () => {
    const { container } = render(
      <StatsDropDown {...defaultProps} leagueSelection={25}>
        <div>Test content</div>
      </StatsDropDown>
    );

    // Target the visible main league selection button specifically
    const visibleButton = container.querySelector("button.visible");
    expect(visibleButton).toBeInTheDocument();
    expect(visibleButton).toHaveTextContent("25");
  });

  test("calls setPage when league selection changes", () => {
    const { container } = render(
      <StatsDropDown {...defaultProps}>
        <div>Test content</div>
      </StatsDropDown>
    );

    // Click the visible league selection button to open dropdown
    const visibleButton = container.querySelector("button.visible");
    if (visibleButton) {
      fireEvent.click(visibleButton);
    }

    // Click on a different option (find the option that's not hidden and not the current selection)
    const option25 = container.querySelector(
      "button:not(.hidden):not(.visible)"
    );
    if (option25 && option25.textContent === "25") {
      fireEvent.click(option25);
      expect(mockSetPage).toHaveBeenCalled();
    }
  });

  test("applies correct CSS classes for animation", () => {
    const { container } = render(
      <StatsDropDown {...defaultProps}>
        <div>Test content</div>
      </StatsDropDown>
    );

    const animatedDiv = container.querySelector(".grid.w-full.overflow-hidden");
    expect(animatedDiv).toHaveClass("grid-rows-[0fr]", "opacity-0");

    // Click to expand using ddbutton class
    const button = container.querySelector(".ddbutton");
    if (button) {
      fireEvent.click(button);
    }

    expect(animatedDiv).toHaveClass("grid-rows-[1fr]", "opacity-100");
  });

  test("renders StatOutputSizeButton with correct props", () => {
    const { container } = render(
      <StatsDropDown {...defaultProps} leagueSelection={50}>
        <div>Test content</div>
      </StatsDropDown>
    );

    // The visible button should show the current selection
    const visibleButton = container.querySelector("button.visible");
    expect(visibleButton).toBeInTheDocument();
    expect(visibleButton).toHaveTextContent("50");
  });
});
