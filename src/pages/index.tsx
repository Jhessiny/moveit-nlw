import style from "../styles/Pages/Home.module.css";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import CompletedChallanges from "../components/CompletedChallanges";
import CountDown from "../components/CountDown";

import Head from "next/head";
import { GetServerSideProps } from "next";
import ChallengeBox from "../components/ChallangeBox";
import { ChallangesProvider } from "../contexts/ChallengesContext";
import { CountDownContextProvider } from "../contexts/CountDownContext";

interface HomeProps {
  level: number;
  currentExperience: number;
  completedChallenges: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallangesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      completedChallenges={props.completedChallenges}
    >
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
    </ChallangesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, completedChallenges } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      completedChallenges: Number(completedChallenges),
    },
  };
};
