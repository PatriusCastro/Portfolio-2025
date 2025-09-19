import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Skills from "./components/Skills";
import Project from "./components/Project";
import Contact from "./components/Contact";
import { getGithubStats } from "./lib/github";

export default async function Home() {
  const { projectCount, stars } = await getGithubStats();

  return (
    <main className="md:px-[2rem] lg:px-[4rem] xl:px-[10rem] bg-linear-135 from-white to-slate-200 text-slate-900 dark:text-slate-200 dark:bg-linear-135 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Stats projectCount={projectCount} stars={stars} />
      <About />
      <Skills />
      <Project />
      <Contact />
    </main>
  );
}
