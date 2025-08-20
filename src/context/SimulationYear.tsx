import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type SimulationYearContextType = {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
};

const SimulationYearContext = createContext<SimulationYearContextType>({
  year: 2025,
  setYear: () => {
    throw new Error("setYear must be used within a SimulationYearProvider");
  },
});

export function SimulationYearProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [year, setYear] = useState(2025);
  return (
    <SimulationYearContext.Provider value={{ year, setYear }}>
      {children}
    </SimulationYearContext.Provider>
  );
}

export { SimulationYearContext };
