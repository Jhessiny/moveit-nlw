import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
import LevelUpModal from "../components/LevelUpModal";

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
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  completedChallenges: number;
}

export const ChallengesContext = createContext({} as challangesContextData);

export const ChallangesProvider = ({
  children,
  ...rest
}: ChallengesProviderProps) => {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 0
  );
  const [completedChallenges, setCompletedChallenges] = useState(
    rest.completedChallenges ?? 0
  );

  const [activeChallenge, setActiveChallange] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
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

  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false);
  };

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("completedChallenges", String(completedChallenges));
  }, [level, currentExperience, completedChallenges]);

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
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  );
};
