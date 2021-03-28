import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountDownContext } from "../contexts/CountDownContext";
import styles from "../styles/components/ChallengeBox.module.css";

export interface ChallengeBoxProps {}

const ChallengeBox: React.FC<ChallengeBoxProps> = () => {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengesContext
  );
  const { resetCountDown } = useContext(CountDownContext);

  const handleChallengeSucceeded = () => {
    resetCountDown();
    completeChallenge();
  };

  const handleChallengeFailed = () => {
    resetCountDown();
    resetChallenge();
  };

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              onClick={handleChallengeFailed}
              type="button"
              className={styles.challengeFailedButton}
            >
              Falhei
            </button>
            <button
              onClick={handleChallengeSucceeded}
              type="button"
              className={styles.challengeSucceededButton}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber novos desafios.</strong>
          <p>
            <img src="icons/level-up.svg" alt="" />
            Avance um level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChallengeBox;
