import style from "../styles/Pages/Home.module.css";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import CompletedChallanges from "../components/CompletedChallanges";
import CountDown from "../components/CountDown";

import Head from "next/head";
import ChallengeBox from "../components/ChallangeBox";
import { CountDownContextProvider } from "../contexts/CountDownContext";

export default function Home() {
  return (
    <div className={style.container}>
      <Head>
        <title>Home | Move.it</title>
      </Head>
      <ExperienceBar />

      <CountDownContextProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallanges />
            <CountDown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountDownContextProvider>
    </div>
  );
}
