import style from "../styles/Pages/Home.module.css";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import CompletedChallanges from "../components/CompletedChallanges";

export default function Home() {
  return (
    <div className={style.container}>
      <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompletedChallanges />
        </div>
        <div></div>
      </section>
    </div>
  );
}
