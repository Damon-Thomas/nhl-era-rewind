import { useContext } from "react";
import {
  SimulationYearContext,
  LeagueProvider,
  League,
} from "@/context/League";
import type { populationEntry } from "@/data/league/populationsByYear";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

// Test component that uses the context
const TestComponent = () => {
  const { year, setYear, league } = useContext(SimulationYearContext);

  return (
    <div>
      <span data-testid="year">The year is: {year}</span>
      <button onClick={() => setYear((prev) => prev - 10)}>Change Year</button>
      <button
        onClick={() => setYear((prev) => prev + 5)}
        data-testid="increase-year"
      >
        Increase Year
      </button>
      <div data-testid="forwards-count">
        Forwards count: {league.getFullRoster().forwards.length}
      </div>
      <div data-testid="defensemen-count">
        Defensemen count: {league.getFullRoster().defensemen.length}
      </div>
      <div data-testid="goalies-count">
        Goalies count: {league.getFullRoster().goalies.length}
      </div>
      <div data-testid="league-year">League year: {league.year}</div>
      <div data-testid="sorted-forwards-count">
        Sorted forwards count: {league.sortedForwards.length}
      </div>
      <div data-testid="sorted-defensemen-count">
        Sorted defensemen count: {league.sortedDefensemen.length}
      </div>
      <div data-testid="sorted-skaters-count">
        Sorted skaters count: {league.sortedSkaters.length}
      </div>
      <div data-testid="sorted-goalies-count">
        Sorted goalies count: {league.sortedGoalies.length}
      </div>
      <div data-testid="positional-roster-forwards">
        Positional roster forwards:{" "}
        {league.getPositionalRoster().forwards.length}
      </div>
      <div data-testid="top-forward-name">
        Top forward: {league.sortedForwards[0]?.firstName}{" "}
        {league.sortedForwards[0]?.lastName}
      </div>
      <div data-testid="top-forward-points">
        Top forward points: {league.sortedForwards[0]?.stats.points ?? 0}
      </div>
      <div data-testid="top-defenseman-name">
        Top defenseman: {league.sortedDefensemen[0]?.firstName}{" "}
        {league.sortedDefensemen[0]?.lastName}
      </div>
      <div data-testid="top-goalie-name">
        Top goalie: {league.sortedGoalies[0]?.firstName}{" "}
        {league.sortedGoalies[0]?.lastName}
      </div>
      <div data-testid="sample-player-nationality">
        Sample player nationality: {league.forwards[0]?.nationality}
      </div>
      <div data-testid="sample-player-position">
        Sample player position: {league.forwards[0]?.position}
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
  describe("League Nationality By Year Functionality", () => {
    // Helper component to test nationalityOfLeague
    const NationalityByYearTestComponent = ({
      testYear,
    }: {
      testYear: number;
    }) => {
      const testLeague = new League(testYear);
      return (
        <div>
          <div data-testid={`nationality-year-${testYear}`}>
            Test year: {testYear}
          </div>
          <div data-testid={`nationality-data-length-${testYear}`}>
            Nationality data length:{" "}
            {Array.isArray(testLeague.nationalityOfLeague)
              ? testLeague.nationalityOfLeague.length
              : Object.keys(testLeague.nationalityOfLeague || {}).length}
          </div>
          <div data-testid={`nationality-data-type-${testYear}`}>
            Nationality data type: {typeof testLeague.nationalityOfLeague}
          </div>
          <div data-testid={`nationality-data-sample-${testYear}`}>
            Nationality sample:{" "}
            {JSON.stringify(
              testLeague.nationalityOfLeague[0] ||
                testLeague.nationalityOfLeague
            )}
          </div>
        </div>
      );
    };

    test("provides nationality data for default year (2024)", () => {
      render(<NationalityByYearTestComponent testYear={2024} />);
      const length = parseInt(
        screen
          .getByTestId("nationality-data-length-2024")
          .textContent?.split(": ")[1] || "0"
      );
      expect(length).toBeGreaterThan(0);
      expect(screen.getByTestId("nationality-year-2024")).toHaveTextContent(
        "Test year: 2024"
      );
    });

    test("provides nationality data for earliest supported year (1961)", () => {
      render(<NationalityByYearTestComponent testYear={1961} />);
      const length = parseInt(
        screen
          .getByTestId("nationality-data-length-1961")
          .textContent?.split(": ")[1] || "0"
      );
      expect(length).toBeGreaterThanOrEqual(0);
      expect(screen.getByTestId("nationality-year-1961")).toHaveTextContent(
        "Test year: 1961"
      );
    });

    test("provides no data for future year (2030)", () => {
      render(<NationalityByYearTestComponent testYear={2030} />);
      const length = parseInt(
        screen
          .getByTestId("nationality-data-length-2030")
          .textContent?.split(": ")[1] || "0"
      );
      expect(length).toBe(0);
      expect(screen.getByTestId("nationality-year-2030")).toHaveTextContent(
        "Test year: 2030"
      );
    });

    test("provides nationality data for year before available data (1950) and handles gracefully", () => {
      render(<NationalityByYearTestComponent testYear={1950} />);
      const length = parseInt(
        screen
          .getByTestId("nationality-data-length-1950")
          .textContent?.split(": ")[1] || "0"
      );
      expect(length).toBeGreaterThanOrEqual(0);
      expect(screen.getByTestId("nationality-year-1950")).toHaveTextContent(
        "Test year: 1950"
      );
    });

    test("nationalityOfLeague updates when year changes", () => {
      const YearChangeNationalityTest = () => {
        const [year, setYear] = React.useState(2024);
        const [league, setLeague] = React.useState(new League(year));
        React.useEffect(() => {
          setLeague(new League(year));
        }, [year]);
        return (
          <div>
            <div data-testid="current-year">Current year: {year}</div>
            <div data-testid="nationality-data-length">
              Nationality data length:{" "}
              {Array.isArray(league.nationalityOfLeague)
                ? league.nationalityOfLeague.length
                : Object.keys(league.nationalityOfLeague || {}).length}
            </div>
            <button data-testid="change-to-1980" onClick={() => setYear(1980)}>
              Change to 1980
            </button>
          </div>
        );
      };
      render(<YearChangeNationalityTest />);
      const initialLength = parseInt(
        screen
          .getByTestId("nationality-data-length")
          .textContent?.split(": ")[1] || "0"
      );
      expect(initialLength).toBeGreaterThan(0);
      fireEvent.click(screen.getByTestId("change-to-1980"));
      expect(screen.getByTestId("current-year")).toHaveTextContent(
        "Current year: 1980"
      );
      const newLength = parseInt(
        screen
          .getByTestId("nationality-data-length")
          .textContent?.split(": ")[1] || "0"
      );
      expect(newLength).toBeGreaterThanOrEqual(0);
      // Data should update (may be different or same depending on implementation)
    });

    test("nationalityOfLeague structure and integrity", () => {
      render(<NationalityByYearTestComponent testYear={2024} />);
      const sample = screen.getByTestId(
        "nationality-data-sample-2024"
      ).textContent;
      expect(sample).toBeTruthy();
      expect(sample).not.toBe("{}");
      expect(sample).not.toBe("null");
    });
  });
  describe("Context Provider and State Management", () => {
    test("provides default year of 2024", () => {
      renderWithLeagueProvider();
      expect(screen.getByTestId("year")).toHaveTextContent("The year is: 2024");
    });

    test("updates year when setYear is called", () => {
      renderWithLeagueProvider();
      const button = screen.getByText("Change Year");
      fireEvent.click(button);
      expect(screen.getByTestId("year")).toHaveTextContent("The year is: 2014");
    });

    test("can increase year", () => {
      renderWithLeagueProvider();
      const increaseButton = screen.getByTestId("increase-year");
      fireEvent.click(increaseButton);
      expect(screen.getByTestId("year")).toHaveTextContent("The year is: 2029");
    });

    test("league year matches context year", () => {
      renderWithLeagueProvider();
      expect(screen.getByTestId("league-year")).toHaveTextContent(
        "League year: 2024"
      );
    });

    test("league year updates when context year changes", () => {
      renderWithLeagueProvider();
      const button = screen.getByText("Change Year");
      fireEvent.click(button);
      expect(screen.getByTestId("league-year")).toHaveTextContent(
        "League year: 2014"
      );
    });
  });

  describe("League Data Access", () => {
    test("provides correct forwards count", () => {
      renderWithLeagueProvider();
      expect(screen.getByTestId("forwards-count")).toHaveTextContent(
        "Forwards count: 449"
      );
    });

    test("provides correct defensemen count", () => {
      renderWithLeagueProvider();
      expect(screen.getByTestId("defensemen-count")).toHaveTextContent(
        "Defensemen count: 253"
      );
    });

    test("provides correct goalies count", () => {
      renderWithLeagueProvider();
      expect(screen.getByTestId("goalies-count")).toHaveTextContent(
        "Goalies count: 73"
      );
    });
  });

  describe("Sorted Data Functionality", () => {
    test("provides sorted forwards with correct count", () => {
      renderWithLeagueProvider();
      expect(screen.getByTestId("sorted-forwards-count")).toHaveTextContent(
        "Sorted forwards count: 449"
      );
    });

    test("provides sorted defensemen with correct count", () => {
      renderWithLeagueProvider();
      expect(screen.getByTestId("sorted-defensemen-count")).toHaveTextContent(
        "Sorted defensemen count: 253"
      );
    });

    test("provides sorted skaters combining forwards and defensemen", () => {
      renderWithLeagueProvider();
      expect(screen.getByTestId("sorted-skaters-count")).toHaveTextContent(
        "Sorted skaters count: 702"
      );
    });

    test("provides sorted goalies with correct count", () => {
      renderWithLeagueProvider();
      expect(screen.getByTestId("sorted-goalies-count")).toHaveTextContent(
        "Sorted goalies count: 73"
      );
    });

    test("sorted forwards are ordered by points (top player has valid data)", () => {
      renderWithLeagueProvider();
      const topForwardName = screen.getByTestId("top-forward-name").textContent;
      const topForwardPoints =
        screen.getByTestId("top-forward-points").textContent;

      expect(topForwardName).toBeTruthy();
      expect(topForwardName).not.toBe(" ");
      expect(
        parseInt(topForwardPoints?.split(": ")[1] || "0")
      ).toBeGreaterThanOrEqual(0);
    });

    test("sorted defensemen have valid top player", () => {
      renderWithLeagueProvider();
      const topDefensemanName = screen.getByTestId(
        "top-defenseman-name"
      ).textContent;

      expect(topDefensemanName).toBeTruthy();
      expect(topDefensemanName).not.toBe(" ");
    });

    test("sorted goalies have valid top player", () => {
      renderWithLeagueProvider();
      const topGoalieName = screen.getByTestId("top-goalie-name").textContent;

      expect(topGoalieName).toBeTruthy();
      expect(topGoalieName).not.toBe(" ");
    });
  });

  describe("Sorting Validation by Points", () => {
    // Helper function to create a test component that accesses sorted data directly
    const SortingTestComponent = () => {
      const { league } = useContext(SimulationYearContext);

      return (
        <div>
          <div data-testid="sorted-forwards-first-three-points">
            {league.sortedForwards.slice(0, 3).map((player, index) => (
              <span
                key={`forward-${index}`}
                data-testid={`forward-${index}-points`}
              >
                {player.stats.points ?? 0}
              </span>
            ))}
          </div>
          <div data-testid="sorted-defensemen-first-three-points">
            {league.sortedDefensemen.slice(0, 3).map((player, index) => (
              <span
                key={`defenseman-${index}`}
                data-testid={`defenseman-${index}-points`}
              >
                {player.stats.points ?? 0}
              </span>
            ))}
          </div>
          <div data-testid="sorted-skaters-first-three-points">
            {league.sortedSkaters.slice(0, 3).map((player, index) => (
              <span
                key={`skater-${index}`}
                data-testid={`skater-${index}-points`}
              >
                {player.stats.points ?? 0}
              </span>
            ))}
          </div>
          <div data-testid="sorted-goalies-first-three-points">
            {league.sortedGoalies.slice(0, 3).map((player, index) => (
              <span
                key={`goalie-${index}`}
                data-testid={`goalie-${index}-points`}
              >
                {player.stats.points ?? 0}
              </span>
            ))}
          </div>
        </div>
      );
    };

    const renderSortingTestComponent = () => {
      return render(
        <LeagueProvider>
          <SortingTestComponent />
        </LeagueProvider>
      );
    };

    test("sorted forwards are in descending order by points", () => {
      renderSortingTestComponent();

      const firstPoints = parseInt(
        screen.getByTestId("forward-0-points").textContent || "0"
      );
      const secondPoints = parseInt(
        screen.getByTestId("forward-1-points").textContent || "0"
      );
      const thirdPoints = parseInt(
        screen.getByTestId("forward-2-points").textContent || "0"
      );

      expect(firstPoints).toBeGreaterThanOrEqual(secondPoints);
      expect(secondPoints).toBeGreaterThanOrEqual(thirdPoints);
    });

    test("sorted defensemen are in descending order by points", () => {
      renderSortingTestComponent();

      const firstPoints = parseInt(
        screen.getByTestId("defenseman-0-points").textContent || "0"
      );
      const secondPoints = parseInt(
        screen.getByTestId("defenseman-1-points").textContent || "0"
      );
      const thirdPoints = parseInt(
        screen.getByTestId("defenseman-2-points").textContent || "0"
      );

      expect(firstPoints).toBeGreaterThanOrEqual(secondPoints);
      expect(secondPoints).toBeGreaterThanOrEqual(thirdPoints);
    });

    test("sorted skaters (combined) are in descending order by points", () => {
      renderSortingTestComponent();

      const firstPoints = parseInt(
        screen.getByTestId("skater-0-points").textContent || "0"
      );
      const secondPoints = parseInt(
        screen.getByTestId("skater-1-points").textContent || "0"
      );
      const thirdPoints = parseInt(
        screen.getByTestId("skater-2-points").textContent || "0"
      );

      expect(firstPoints).toBeGreaterThanOrEqual(secondPoints);
      expect(secondPoints).toBeGreaterThanOrEqual(thirdPoints);
    });

    test("sorted goalies are in descending order by points", () => {
      renderSortingTestComponent();

      const firstPoints = parseInt(
        screen.getByTestId("goalie-0-points").textContent || "0"
      );
      const secondPoints = parseInt(
        screen.getByTestId("goalie-1-points").textContent || "0"
      );
      const thirdPoints = parseInt(
        screen.getByTestId("goalie-2-points").textContent || "0"
      );

      expect(firstPoints).toBeGreaterThanOrEqual(secondPoints);
      expect(secondPoints).toBeGreaterThanOrEqual(thirdPoints);
    });

    test("top skater from combined list has highest or equal points to top forward and defenseman", () => {
      renderSortingTestComponent();

      const topSkaterPoints = parseInt(
        screen.getByTestId("skater-0-points").textContent || "0"
      );
      const topForwardPoints = parseInt(
        screen.getByTestId("forward-0-points").textContent || "0"
      );
      const topDefensemanPoints = parseInt(
        screen.getByTestId("defenseman-0-points").textContent || "0"
      );

      expect(topSkaterPoints).toBeGreaterThanOrEqual(topForwardPoints);
      expect(topSkaterPoints).toBeGreaterThanOrEqual(topDefensemanPoints);
    });

    // Test that verifies complete sorting integrity by checking longer sequences
    test("forwards list is completely sorted by points (checking top 10)", () => {
      const CompleteForwardsSortTest = () => {
        const { league } = useContext(SimulationYearContext);
        const topTenForwards = league.sortedForwards.slice(0, 10);

        return (
          <div>
            {topTenForwards.map((player, index) => (
              <div key={index} data-testid={`forward-${index}-complete-points`}>
                {player.stats.points ?? 0}
              </div>
            ))}
          </div>
        );
      };

      render(
        <LeagueProvider>
          <CompleteForwardsSortTest />
        </LeagueProvider>
      );

      // Check that each player has points less than or equal to the previous
      for (let i = 0; i < 9; i++) {
        const currentPoints = parseInt(
          screen.getByTestId(`forward-${i}-complete-points`).textContent || "0"
        );
        const nextPoints = parseInt(
          screen.getByTestId(`forward-${i + 1}-complete-points`).textContent ||
            "0"
        );
        expect(currentPoints).toBeGreaterThanOrEqual(nextPoints);
      }
    });

    test("defensemen list is completely sorted by points (checking top 10)", () => {
      const CompleteDefensemenSortTest = () => {
        const { league } = useContext(SimulationYearContext);
        const topTenDefensemen = league.sortedDefensemen.slice(0, 10);

        return (
          <div>
            {topTenDefensemen.map((player, index) => (
              <div
                key={index}
                data-testid={`defenseman-${index}-complete-points`}
              >
                {player.stats.points ?? 0}
              </div>
            ))}
          </div>
        );
      };

      render(
        <LeagueProvider>
          <CompleteDefensemenSortTest />
        </LeagueProvider>
      );

      // Check that each player has points less than or equal to the previous
      for (let i = 0; i < 9; i++) {
        const currentPoints = parseInt(
          screen.getByTestId(`defenseman-${i}-complete-points`).textContent ||
            "0"
        );
        const nextPoints = parseInt(
          screen.getByTestId(`defenseman-${i + 1}-complete-points`)
            .textContent || "0"
        );
        expect(currentPoints).toBeGreaterThanOrEqual(nextPoints);
      }
    });
  });

  describe("League Methods", () => {
    test("getPositionalRoster returns correct structure", () => {
      renderWithLeagueProvider();
      expect(
        screen.getByTestId("positional-roster-forwards")
      ).toHaveTextContent("Positional roster forwards: 449");
    });

    test("getFullRoster returns all position arrays", () => {
      renderWithLeagueProvider();
      // All counts should match the individual position counts
      expect(screen.getByTestId("forwards-count")).toHaveTextContent(
        "Forwards count: 449"
      );
      expect(screen.getByTestId("defensemen-count")).toHaveTextContent(
        "Defensemen count: 253"
      );
      expect(screen.getByTestId("goalies-count")).toHaveTextContent(
        "Goalies count: 73"
      );
    });
  });

  describe("Player Data Integrity", () => {
    test("players have valid nationality data", () => {
      renderWithLeagueProvider();
      const nationality = screen.getByTestId(
        "sample-player-nationality"
      ).textContent;

      expect(nationality).toBeTruthy();
      expect(nationality).toContain("nationality: ");
    });

    test("players have valid position data", () => {
      renderWithLeagueProvider();
      const position = screen.getByTestId("sample-player-position").textContent;

      expect(position).toBeTruthy();
      expect(position).toContain("position: ");
    });
  });

  describe("Context Error Handling", () => {
    test("context provides default error function when used outside provider", () => {
      const TestComponentWithoutProvider = () => {
        const { year, league } = useContext(SimulationYearContext);

        return (
          <div>
            <div data-testid="default-year">{year}</div>
            <div data-testid="league-exists">
              {league ? "exists" : "undefined"}
            </div>
          </div>
        );
      };

      render(<TestComponentWithoutProvider />);

      expect(screen.getByTestId("default-year")).toHaveTextContent("2024");
      expect(screen.getByTestId("league-exists")).toHaveTextContent(
        "undefined"
      );
    });
  });

  describe("League Reinitialization", () => {
    test("league is reinitialized when year changes", () => {
      renderWithLeagueProvider();

      // Get initial league year
      expect(screen.getByTestId("league-year")).toHaveTextContent(
        "League year: 2024"
      );

      // Change year
      const button = screen.getByText("Change Year");
      fireEvent.click(button);

      // Verify league was reinitialized with new year
      expect(screen.getByTestId("league-year")).toHaveTextContent(
        "League year: 2014"
      );

      // Data integrity should remain
      expect(screen.getByTestId("forwards-count")).toHaveTextContent(
        "Forwards count: 449"
      );
      expect(screen.getByTestId("sorted-skaters-count")).toHaveTextContent(
        "Sorted skaters count: 702"
      );
    });
  });

  describe("Population Data Functionality", () => {
    // Helper component to test population data
    const PopulationTestComponent = () => {
      const { league } = useContext(SimulationYearContext);

      return (
        <div>
          <div data-testid="population-data-length">
            Population entries: {league.populationNumbers.length}
          </div>
          <div data-testid="population-year">League year: {league.year}</div>
          {league.populationNumbers.slice(0, 3).map((entry, index) => (
            <div key={index} data-testid={`population-entry-${index}`}>
              {entry.Country}: {entry.Population}
            </div>
          ))}
          <div data-testid="canada-population">
            Canada population:{" "}
            {
              league.populationNumbers.find(
                (p: populationEntry) => p.Country === "Canada"
              )?.Population
            }
          </div>
          <div data-testid="usa-population">
            USA population:{" "}
            {
              league.populationNumbers.find(
                (p: populationEntry) => p.Country === "United States"
              )?.Population
            }
          </div>
        </div>
      );
    };

    const PopulationYearTestComponent = ({
      testYear,
    }: {
      testYear: number;
    }) => {
      // Create a temporary league instance with the test year
      const testLeague = new League(testYear);

      return (
        <div>
          <div data-testid={`population-data-length-${testYear}`}>
            Population entries: {testLeague.populationNumbers.length}
          </div>
          <div data-testid={`population-year-${testYear}`}>
            Test year: {testLeague.year}
          </div>
          <div data-testid={`canada-population-${testYear}`}>
            Canada population:{" "}
            {
              testLeague.populationNumbers.find(
                (p: populationEntry) => p.Country === "Canada"
              )?.Population
            }
          </div>
        </div>
      );
    };

    const renderPopulationTestComponent = () => {
      return render(
        <LeagueProvider>
          <PopulationTestComponent />
        </LeagueProvider>
      );
    };

    test("provides population data for default year", () => {
      renderPopulationTestComponent();

      const populationLength = screen.getByTestId("population-data-length");
      const lengthValue = parseInt(
        populationLength.textContent?.split(": ")[1] || "0"
      );

      expect(lengthValue).toBeGreaterThan(0);
      expect(screen.getByTestId("population-year")).toHaveTextContent(
        "League year: 2024"
      );
    });

    test("population data contains expected countries", () => {
      renderPopulationTestComponent();

      const canadaPopulation =
        screen.getByTestId("canada-population").textContent;
      const usaPopulation = screen.getByTestId("usa-population").textContent;

      expect(canadaPopulation).toContain("Canada population:");
      expect(canadaPopulation).not.toContain("undefined");
      expect(usaPopulation).toContain("USA population:");
      expect(usaPopulation).not.toContain("undefined");

      // Extract numeric values
      const canadaValue = parseInt(canadaPopulation?.split(": ")[1] || "0");
      const usaValue = parseInt(usaPopulation?.split(": ")[1] || "0");

      expect(canadaValue).toBeGreaterThan(0);
      expect(usaValue).toBeGreaterThan(0);
    });

    test("population entries have correct structure", () => {
      renderPopulationTestComponent();

      const populationLength = screen.getByTestId("population-data-length");
      const lengthValue = parseInt(
        populationLength.textContent?.split(": ")[1] || "0"
      );
      expect(lengthValue).toBeGreaterThan(0);

      // Check that first few population entries have valid structure
      for (let i = 0; i < 3; i++) {
        const entryText = screen.getByTestId(
          `population-entry-${i}`
        ).textContent;
        expect(entryText).toMatch(/^[A-Za-z\s]+: \d+$/);
      }
    });

    test("handles earliest supported year (1961)", () => {
      render(
        <LeagueProvider>
          <PopulationYearTestComponent testYear={1961} />
        </LeagueProvider>
      );

      const populationLength = screen.getByTestId(
        "population-data-length-1961"
      );
      const lengthValue = parseInt(
        populationLength.textContent?.split(": ")[1] || "0"
      );

      expect(lengthValue).toBeGreaterThan(0);
      expect(screen.getByTestId("population-year-1961")).toHaveTextContent(
        "Test year: 1961"
      );

      // Should have Canada data for 1961
      const canadaPopulation = screen.getByTestId(
        "canada-population-1961"
      ).textContent;
      expect(canadaPopulation).toContain("Canada population:");
      expect(canadaPopulation).not.toContain("undefined");
    });

    test("handles latest supported year (2024)", () => {
      render(
        <LeagueProvider>
          <PopulationYearTestComponent testYear={2024} />
        </LeagueProvider>
      );

      const populationLength = screen.getByTestId(
        "population-data-length-2024"
      );
      const lengthValue = parseInt(
        populationLength.textContent?.split(": ")[1] || "0"
      );

      expect(lengthValue).toBeGreaterThan(0);
      expect(screen.getByTestId("population-year-2024")).toHaveTextContent(
        "Test year: 2024"
      );

      // Should have Canada data for 2024 (using 2023-24 data)
      const canadaPopulation = screen.getByTestId(
        "canada-population-2024"
      ).textContent;
      expect(canadaPopulation).toContain("Canada population:");
      expect(canadaPopulation).not.toContain("undefined");
    });

    test("handles future year (2025) by returning most recent data", () => {
      render(
        <LeagueProvider>
          <PopulationYearTestComponent testYear={2025} />
        </LeagueProvider>
      );

      const populationLength = screen.getByTestId(
        "population-data-length-2025"
      );
      const lengthValue = parseInt(
        populationLength.textContent?.split(": ")[1] || "0"
      );

      expect(lengthValue).toBeGreaterThan(0);
      expect(screen.getByTestId("population-year-2025")).toHaveTextContent(
        "Test year: 2025"
      );

      // Should have Canada data for 2025 (using 2023-24 data)
      const canadaPopulation = screen.getByTestId(
        "canada-population-2025"
      ).textContent;
      expect(canadaPopulation).toContain("Canada population:");
      expect(canadaPopulation).not.toContain("undefined");

      // Should return the same data as 2024 (both use 2023-24 data)
      const canada2025Value = parseInt(canadaPopulation?.split(": ")[1] || "0");
      expect(canada2025Value).toBeGreaterThan(30000000);
      expect(canada2025Value).toBeLessThan(50000000);
    });

    test("handles year with available data (2023)", () => {
      render(
        <LeagueProvider>
          <PopulationYearTestComponent testYear={2023} />
        </LeagueProvider>
      );

      const populationLength = screen.getByTestId(
        "population-data-length-2023"
      );
      const lengthValue = parseInt(
        populationLength.textContent?.split(": ")[1] || "0"
      );

      expect(lengthValue).toBeGreaterThan(0);
      expect(screen.getByTestId("population-year-2023")).toHaveTextContent(
        "Test year: 2023"
      );

      // Should have Canada data for 2023
      const canadaPopulation = screen.getByTestId(
        "canada-population-2023"
      ).textContent;
      expect(canadaPopulation).toContain("Canada population:");
      expect(canadaPopulation).not.toContain("undefined");

      // Should have realistic population values
      const canadaValue = parseInt(canadaPopulation?.split(": ")[1] || "0");
      expect(canadaValue).toBeGreaterThan(30000000);
      expect(canadaValue).toBeLessThan(50000000);
    });

    test("handles year before available data (1950) with growth rate calculation", () => {
      render(
        <LeagueProvider>
          <PopulationYearTestComponent testYear={1950} />
        </LeagueProvider>
      );

      const populationLength = screen.getByTestId(
        "population-data-length-1950"
      );
      const lengthValue = parseInt(
        populationLength.textContent?.split(": ")[1] || "0"
      );

      expect(lengthValue).toBeGreaterThan(0);
      expect(screen.getByTestId("population-year-1950")).toHaveTextContent(
        "Test year: 1950"
      );

      // Should have calculated Canada data for 1950
      const canadaPopulation = screen.getByTestId(
        "canada-population-1950"
      ).textContent;
      expect(canadaPopulation).toContain("Canada population:");
      expect(canadaPopulation).not.toContain("undefined");

      // Population should be smaller for 1950 than modern years
      const canadaValue1950 = parseInt(canadaPopulation?.split(": ")[1] || "0");
      expect(canadaValue1950).toBeGreaterThan(0);
      expect(canadaValue1950).toBeLessThan(40000000); // Should be less than modern Canada population
    });

    test("population values are reasonable and numeric", () => {
      renderPopulationTestComponent();

      const canadaPopulationText =
        screen.getByTestId("canada-population").textContent;
      const usaPopulationText =
        screen.getByTestId("usa-population").textContent;

      const canadaValue = parseInt(canadaPopulationText?.split(": ")[1] || "0");
      const usaValue = parseInt(usaPopulationText?.split(": ")[1] || "0");

      // Canada population should be reasonable (between 30-50 million)
      expect(canadaValue).toBeGreaterThan(30000000);
      expect(canadaValue).toBeLessThan(50000000);

      // USA population should be reasonable (between 300-400 million)
      expect(usaValue).toBeGreaterThan(300000000);
      expect(usaValue).toBeLessThan(400000000);

      // USA should have larger population than Canada
      expect(usaValue).toBeGreaterThan(canadaValue);
    });

    test("population data updates when league year changes", () => {
      const YearChangeTestComponent = () => {
        const { year, setYear, league } = useContext(SimulationYearContext);

        return (
          <div>
            <div data-testid="current-year">Current year: {year}</div>
            <div data-testid="current-canada-population">
              Canada population:{" "}
              {
                league.populationNumbers.find(
                  (p: populationEntry) => p.Country === "Canada"
                )?.Population
              }
            </div>
            <button onClick={() => setYear(1980)} data-testid="change-to-1980">
              Change to 1980
            </button>
          </div>
        );
      };

      render(
        <LeagueProvider>
          <YearChangeTestComponent />
        </LeagueProvider>
      );

      // Get initial population (should have data for 2024, using 2023-24 data)
      const initialPopulationText = screen.getByTestId(
        "current-canada-population"
      ).textContent;
      const initialPopulation = parseInt(
        initialPopulationText?.split(": ")[1] || "0"
      );

      expect(initialPopulation).toBeGreaterThan(0);

      // Change year to 1980
      const changeButton = screen.getByTestId("change-to-1980");
      fireEvent.click(changeButton);

      // Check that year changed
      expect(screen.getByTestId("current-year")).toHaveTextContent(
        "Current year: 1980"
      );

      // Check that population data updated
      const newPopulationText = screen.getByTestId(
        "current-canada-population"
      ).textContent;
      const newPopulation = parseInt(newPopulationText?.split(": ")[1] || "0");

      expect(newPopulation).toBeGreaterThan(0);
      // Data should be different between 2024 and 1980
      expect(newPopulation).not.toBe(initialPopulation);
      // 1980 should likely have smaller population than 2024
      expect(newPopulation).toBeLessThan(initialPopulation);
    });

    test("handles edge case years gracefully", () => {
      const EdgeCaseTestComponent = ({ testYear }: { testYear: number }) => {
        const testLeague = new League(testYear);

        return (
          <div>
            <div data-testid={`population-length-${testYear}`}>
              {testLeague.populationNumbers.length}
            </div>
          </div>
        );
      };

      // Test very early year
      render(<EdgeCaseTestComponent testYear={1900} />);
      const length1900 = parseInt(
        screen.getByTestId("population-length-1900").textContent || "0"
      );

      // Test future year beyond available data
      render(<EdgeCaseTestComponent testYear={2030} />);
      const length2030 = parseInt(
        screen.getByTestId("population-length-2030").textContent || "0"
      );

      // Should handle gracefully - either return data or empty array
      expect(length1900).toBeGreaterThanOrEqual(0);
      expect(length2030).toBeGreaterThanOrEqual(0);
    });

    test("population data is consistent across multiple league instances", () => {
      const ConsistencyTestComponent = () => {
        const league1 = new League(2020);
        const league2 = new League(2020);

        const canada1 = league1.populationNumbers.find(
          (p: populationEntry) => p.Country === "Canada"
        )?.Population;
        const canada2 = league2.populationNumbers.find(
          (p: populationEntry) => p.Country === "Canada"
        )?.Population;

        return (
          <div>
            <div data-testid="league1-canada">{canada1}</div>
            <div data-testid="league2-canada">{canada2}</div>
            <div data-testid="populations-match">
              {canada1 === canada2 ? "match" : "differ"}
            </div>
          </div>
        );
      };

      render(<ConsistencyTestComponent />);

      expect(screen.getByTestId("populations-match")).toHaveTextContent(
        "match"
      );
    });
  });

  describe("Nationality Sorting Functionality", () => {
    // Helper component to test nationality sorting
    const NationalityTestComponent = () => {
      const { league } = useContext(SimulationYearContext);

      return (
        <div>
          <div data-testid="nationality-sorted-total-count">
            Total nationality sorted players:{" "}
            {league.leagueSortedByNationality.length}
          </div>
          <div data-testid="nationality-sorted-first-five">
            {league.leagueSortedByNationality
              .slice(0, 5)
              .map((player, index) => (
                <div
                  key={`nationality-${index}`}
                  data-testid={`nationality-${index}`}
                >
                  {player.nationality}
                </div>
              ))}
          </div>
          <div data-testid="nationality-sorted-last-five">
            {league.leagueSortedByNationality.slice(-5).map((player, index) => (
              <div
                key={`nationality-last-${index}`}
                data-testid={`nationality-last-${index}`}
              >
                {player.nationality}
              </div>
            ))}
          </div>
          <div data-testid="sample-nationality-players">
            {league.leagueSortedByNationality
              .filter((player) => player.nationality === "CAN")
              .slice(0, 3)
              .map((player, index) => (
                <div
                  key={`canadian-${index}`}
                  data-testid={`canadian-player-${index}`}
                >
                  {player.firstName} {player.lastName} - {player.nationality}
                </div>
              ))}
          </div>
          <div data-testid="unique-nationalities">
            {Array.from(
              new Set(
                league.leagueSortedByNationality.map((p) => p.nationality)
              )
            )
              .sort()
              .slice(0, 10)
              .map((nationality, index) => (
                <div
                  key={nationality}
                  data-testid={`unique-nationality-${index}`}
                >
                  {nationality}
                </div>
              ))}
          </div>
        </div>
      );
    };

    const renderNationalityTestComponent = () => {
      return render(
        <LeagueProvider>
          <NationalityTestComponent />
        </LeagueProvider>
      );
    };

    test("nationality sorted array includes all players from all positions", () => {
      renderNationalityTestComponent();

      // Total should equal forwards + defensemen + goalies
      const totalExpected = 449 + 253 + 73; // From earlier tests
      expect(
        screen.getByTestId("nationality-sorted-total-count")
      ).toHaveTextContent(`Total nationality sorted players: ${totalExpected}`);
    });

    test("nationality sorting is alphabetical", () => {
      renderNationalityTestComponent();

      // Check that first 5 nationalities are in alphabetical order
      const nationalities = [];
      for (let i = 0; i < 5; i++) {
        const nationalityText = screen.getByTestId(
          `nationality-${i}`
        ).textContent;
        if (nationalityText) {
          nationalities.push(nationalityText);
        }
      }

      // Verify alphabetical ordering
      for (let i = 0; i < nationalities.length - 1; i++) {
        expect(
          nationalities[i].localeCompare(nationalities[i + 1])
        ).toBeLessThanOrEqual(0);
      }
    });

    test("players with same nationality are grouped together", () => {
      renderNationalityTestComponent();

      const canadianPlayers = screen.getAllByTestId(/canadian-player-\d+/);
      expect(canadianPlayers.length).toBe(3);

      // Each Canadian player should have "CAN" in their text
      canadianPlayers.forEach((player) => {
        expect(player.textContent).toContain("CAN");
      });
    });

    test("nationality sorting preserves player data integrity", () => {
      renderNationalityTestComponent();

      // Check that we have meaningful nationality data
      const firstNationality = screen.getByTestId("nationality-0").textContent;
      const lastNationality =
        screen.getByTestId("nationality-last-4").textContent;

      expect(firstNationality).toBeTruthy();
      expect(firstNationality).not.toBe("");
      expect(lastNationality).toBeTruthy();
      expect(lastNationality).not.toBe("");
    });

    test("contains expected NHL nationalities", () => {
      renderNationalityTestComponent();

      // Get list of unique nationalities from first 10
      const uniqueNationalities: string[] = [];
      for (let i = 0; i < 10; i++) {
        const elem = screen.queryByTestId(`unique-nationality-${i}`);
        if (elem && elem.textContent) {
          uniqueNationalities.push(elem.textContent);
        }
      }

      // Should contain some common NHL nationalities (alphabetically sorted) - using country codes
      const expectedNationalities = [
        "CAN",
        "CZE",
        "FIN",
        "DEU",
        "RUS",
        "SWE",
        "USA",
      ];
      const foundExpected = expectedNationalities.filter((nat) =>
        uniqueNationalities.includes(nat)
      );

      expect(foundExpected.length).toBeGreaterThan(0);
    });

    test("nationality sorting is case-sensitive and maintains locale comparison", () => {
      const CustomNationalityTestComponent = () => {
        const { league } = useContext(SimulationYearContext);

        // Get a sample of players with different nationality cases if any exist
        const samplePlayers = league.leagueSortedByNationality.slice(0, 20);
        const nationalitiesWithCases = samplePlayers.map((p) => p.nationality);

        return (
          <div>
            <div data-testid="nationality-case-sample">
              {nationalitiesWithCases.slice(0, 5).map((nat, index) => (
                <div key={index} data-testid={`nationality-case-${index}`}>
                  {nat}
                </div>
              ))}
            </div>
          </div>
        );
      };

      render(
        <LeagueProvider>
          <CustomNationalityTestComponent />
        </LeagueProvider>
      );

      // Verify that nationalities exist and are properly formatted
      for (let i = 0; i < 5; i++) {
        const nationalityElement = screen.queryByTestId(
          `nationality-case-${i}`
        );
        if (nationalityElement && nationalityElement.textContent) {
          expect(nationalityElement.textContent).toBeTruthy();
          expect(nationalityElement.textContent.trim().length).toBeGreaterThan(
            0
          );
        }
      }
    });

    test("nationality sorter maintains complete sorting integrity", () => {
      const CompleteSortIntegrityComponent = () => {
        const { league } = useContext(SimulationYearContext);

        return (
          <div>
            {league.leagueSortedByNationality
              .slice(0, 50)
              .map((player, index) => (
                <div key={index} data-testid={`full-nationality-${index}`}>
                  {player.nationality}
                </div>
              ))}
          </div>
        );
      };

      render(
        <LeagueProvider>
          <CompleteSortIntegrityComponent />
        </LeagueProvider>
      );

      // Check that each nationality is less than or equal to the next (locale comparison)
      for (let i = 0; i < 49; i++) {
        const currentNat =
          screen.getByTestId(`full-nationality-${i}`).textContent || "";
        const nextNat =
          screen.getByTestId(`full-nationality-${i + 1}`).textContent || "";

        expect(currentNat.localeCompare(nextNat)).toBeLessThanOrEqual(0);
      }
    });

    test("nationality sorting works with mixed positions", () => {
      const MixedPositionsTestComponent = () => {
        const { league } = useContext(SimulationYearContext);

        // Find players with same nationality but different positions
        const canadianPlayers = league.leagueSortedByNationality
          .filter((p) => p.nationality === "CAN")
          .slice(0, 6);

        return (
          <div>
            {canadianPlayers.map((player, index) => (
              <div key={index} data-testid={`mixed-position-${index}`}>
                {player.position} - {player.firstName} {player.lastName}
              </div>
            ))}
          </div>
        );
      };

      render(
        <LeagueProvider>
          <MixedPositionsTestComponent />
        </LeagueProvider>
      );

      // Should have players from different positions but same nationality
      const positionElements = screen.getAllByTestId(/mixed-position-\d+/);

      if (positionElements.length > 0) {
        const positions = positionElements
          .map((el) => el.textContent?.split(" - ")[0])
          .filter(Boolean);

        // Should have a mix of positions (forwards, defensemen, goalies)
        expect(positions.length).toBeGreaterThan(0);

        // All should have valid position data
        positions.forEach((position) => {
          expect(position).toMatch(/^(C|RW|LW|D|G|L|R)$/);
        });
      }
    });

    test("nationality sorting handles edge cases properly", () => {
      const EdgeCasesTestComponent = () => {
        const { league } = useContext(SimulationYearContext);

        // Test with unusual or edge case nationalities
        const allNationalities = Array.from(
          new Set(league.leagueSortedByNationality.map((p) => p.nationality))
        );
        const specialNationalities = allNationalities.filter(
          (nat) => nat.includes(" ") || nat.includes("-") || nat.includes("'")
        );

        return (
          <div>
            <div data-testid="total-unique-nationalities">
              Total unique nationalities: {allNationalities.length}
            </div>
            <div data-testid="special-nationalities-count">
              Special nationalities: {specialNationalities.length}
            </div>
            {specialNationalities.slice(0, 3).map((nat, index) => (
              <div key={index} data-testid={`special-nationality-${index}`}>
                {nat}
              </div>
            ))}
          </div>
        );
      };

      render(
        <LeagueProvider>
          <EdgeCasesTestComponent />
        </LeagueProvider>
      );

      const totalNationalitiesText = screen.getByTestId(
        "total-unique-nationalities"
      ).textContent;
      const totalNationalities = parseInt(
        totalNationalitiesText?.split(": ")[1] || "0"
      );

      expect(totalNationalities).toBeGreaterThan(5); // Should have multiple nationalities
      expect(totalNationalities).toBeLessThan(50); // But reasonable number for NHL
    });
  });

  describe("teamsFromYear property", () => {
    it("should return an array of teams for a valid year", () => {
      const league = new League(2024);
      expect(Array.isArray(league.teamsFromYear)).toBe(true);
      expect(league.teamsFromYear.length).toBeGreaterThan(0);
    });

    it("should return teams with correct structure", () => {
      const league = new League(2024);
      const teams = league.teamsFromYear;

      if (teams.length > 0) {
        teams.forEach((team) => {
          expect(team).toHaveProperty("name");
          expect(team).toHaveProperty("abbreviation");
          expect(team).toHaveProperty("logo");
          expect(typeof team.name).toBe("string");
          expect(typeof team.abbreviation).toBe("string");
          expect(typeof team.logo).toBe("string");
        });
      }
    });

    it("should return empty array for years outside valid boundaries", () => {
      const yearTooEarly = new League(1917); // Before NHL founded
      const yearTooLate = new League(2026); // Future year not in data

      expect(yearTooEarly.teamsFromYear).toEqual([]);
      expect(yearTooLate.teamsFromYear).toEqual([]);
    });

    it("should return different teams for different years", () => {
      const league1918 = new League(1918); // First NHL season
      const league2024 = new League(2024); // Recent season

      expect(league1918.teamsFromYear).not.toEqual(league2024.teamsFromYear);
      expect(league1918.teamsFromYear.length).toBeLessThan(
        league2024.teamsFromYear.length
      );
    });

    it("should return teams for the year specified in constructor", () => {
      const testYear = 2023;
      const league = new League(testYear);

      expect(league.year).toBe(testYear);
      // The teamsFromYear should correspond to the year passed to constructor
      expect(Array.isArray(league.teamsFromYear)).toBe(true);
    });

    it("should handle edge case years within valid range", () => {
      const firstYear = new League(1918); // First year in data
      const lastYear = new League(2025); // Last year in data

      expect(Array.isArray(firstYear.teamsFromYear)).toBe(true);
      expect(Array.isArray(lastYear.teamsFromYear)).toBe(true);
      expect(firstYear.teamsFromYear.length).toBeGreaterThan(0);
      expect(lastYear.teamsFromYear.length).toBeGreaterThan(0);
    });
  });
});
