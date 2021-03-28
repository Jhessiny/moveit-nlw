import { createContext, ReactNode } from "react";

interface CountDownContextData {}

interface CountDownProviderProps {
  children: ReactNode;
}

const CountDownContext = createContext({} as CountDownContextData);

export const CountDownContextProvider = ({
  children,
}: CountDownProviderProps) => {
  return (
    <CountDownContext.Provider value={{}}>{children}</CountDownContext.Provider>
  );
};
