import styles from "../styles/components/Profile.module.css";
export interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/jhessiny.png" alt="" />
      <div>
        <strong>Jhessiny Mattos</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  );
};

export default Profile;
