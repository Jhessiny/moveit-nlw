import { createContext, ReactNode, useState } from "react";

interface challangesContextData {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  completedChallenges: number;
  startNewChallenge: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as challangesContextData);

export const ChallangesProvider = ({ children }: ChallengesProviderProps) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);

  const levelUp = () => {
    setLevel(level + 1);
  };

  const startNewChallenge = () => {
    console.log("New challenge");
  };

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        completedChallenges,
        startNewChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};
