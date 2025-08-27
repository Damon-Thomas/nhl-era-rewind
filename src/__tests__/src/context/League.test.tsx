import { useContext } from "react";
import { SimulationYearContext, LeagueProvider } from "@/context/League";
import { render, screen, fireEvent } from "@testing-library/react";

// Test component that uses the context
const TestComponent = () => {
  const { year, setYear, league } = useContext(SimulationYearContext);

  return (
    <div>
      <span data-testid="year">The year is: {year}</span>
      <button onClick={() => setYear((prev) => prev - 10)}>Change Year</button>
      <div data-testid="forwards-count">
        Forwards count: {league.getFullRoster().forwards.length}
      </div>
      <div data-testid="defensemen-count">
        Defensemen count: {league.getFullRoster().defensemen.length}
      </div>
      <div data-testid="goalies-count">
        Goalies count: {league.getFullRoster().goalies.length}
      </div>
    </div>
  );
};

// Helper function to render the component with provider
const renderWithLeagueProvider = () => {
  return render(
    <LeagueProvider>
      <TestComponent />
    </LeagueProvider>
  );
};

describe("League Context", () => {
  test("Get the default year", () => {
    renderWithLeagueProvider();
    expect(screen.getByTestId("year")).toHaveTextContent("The year is: 2025");
  });

  test("Set the year", () => {
    renderWithLeagueProvider();
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByTestId("year")).toHaveTextContent("The year is: 2015");
  });

  test("Access forward data", () => {
    renderWithLeagueProvider();
    expect(screen.getByTestId("forwards-count")).toHaveTextContent(
      "Forwards count: 449"
    );
  });

  test("Access defensemen data", () => {
    renderWithLeagueProvider();
    expect(screen.getByTestId("defensemen-count")).toHaveTextContent(
      "Defensemen count: 253"
    );
  });
  test("Access goalie data", () => {
    renderWithLeagueProvider();
    expect(screen.getByTestId("goalies-count")).toHaveTextContent(
      "Goalies count: 73"
    );
  });
});
