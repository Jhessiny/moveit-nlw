import styles from "../styles/components/CompletedChallanges.module.css";
export interface CompletedChallangesProps {}

const CompletedChallanges: React.FC<CompletedChallangesProps> = () => {
  return (
    <div className={styles.completedChallangesContainer}>
      <span>Desafios Completos</span>
      <span>5</span>
    </div>
  );
};

export default CompletedChallanges;
