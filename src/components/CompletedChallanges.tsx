import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/CompletedChallanges.module.css";
export interface CompletedChallangesProps {}

const CompletedChallanges: React.FC<CompletedChallangesProps> = () => {
  const { completedChallenges } = useContext(ChallengesContext);
  return (
    <div className={styles.completedChallangesContainer}>
      <span>Desafios Completos</span>
      <span>{completedChallenges}</span>
    </div>
  );
};

export default CompletedChallanges;
