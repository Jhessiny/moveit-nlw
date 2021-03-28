import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from "../../challenges.json";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface challangesContextData {
  level: number;
  levelUp: () => void;
  currentExperience: number;
  completedChallenges: number;
  startNewChallenge: () => void;
  activeChallenge: Challenge;
  resetChallenge: () => void;
  completeChallenge: () => void;
  experienceToNextLevel: number;
}

interface ChallengesProviderProps {
  children: ReactNode;
}

export const ChallengesContext = createContext({} as challangesContextData);

export const ChallangesProvider = ({ children }: ChallengesProviderProps) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState(0);

  const [activeChallenge, setActiveChallange] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const levelUp = () => {
    setLevel(level + 1);
  };

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallange(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      const not = new Notification("Novo desafio!", {
        body: `Valendo ${challenge.amount}xp`,
      });
      console.log(not);
    }
  };

  const resetChallenge = () => {
    setActiveChallange(null);
  };

  const completeChallenge = () => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      levelUp();
      finalExperience = finalExperience - experienceToNextLevel;
    }

    setCurrentExperience(finalExperience);
    setActiveChallange(null);
    setCompletedChallenges(completedChallenges + 1);
  };

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        completedChallenges,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
      }}
    >
      {children}
    </ChallengesContext.Provider>
  );
};
