import { useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountDownContext } from "../contexts/CountDownContext";
import styles from "../styles/components/CountDown.module.css";
export interface CountDownProps {}

const CountDown: React.FC<CountDownProps> = () => {
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountDown,
    resetCountDown,
  } = useContext(CountDownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countDownButton}>
          Ciclo encerrado <img src="icons/twitter.svg" alt="" />
        </button>
      ) : (
        <>
          {!isActive ? (
            <button
              onClick={startCountDown}
              type="button"
              className={styles.countDownButton}
            >
              Iniciar ciclo
            </button>
          ) : (
            <button
              onClick={resetCountDown}
              type="button"
              className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
            >
              Abandonar ciclo
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CountDown;
