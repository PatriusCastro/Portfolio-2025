import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Skills from "./components/Skills";
import Project from "./components/Project";
import Contact from "./components/Contact";
import { getGithubStats } from "./lib/github";
import FadeInSection from "./components/FadeInSection";

export default async function Home() {
  const { projectCount, stars } = await getGithubStats();

  return (
    <main
      className="min-h-[100vh] relative z-10 md:px-[2rem] lg:px-[4rem] xl:px-[10rem]"
    >
      <Navbar />
      <Hero />
      <FadeInSection delay={0.1}><Stats projectCount={projectCount} stars={stars} /></FadeInSection>
      <FadeInSection delay={0.2}><About /></FadeInSection>
      <FadeInSection delay={0.3}><Skills /></FadeInSection>
      <FadeInSection delay={0.4}><Project /></FadeInSection>
      <FadeInSection delay={0.5}><Contact /></FadeInSection>
      <footer
        className="mt-12 py-6 px-4 text-center text-xs font-[var(--font-mono)] font-[var(--muted2)]"
      >
        &copy; {new Date().getFullYear()} Patrius Castro. All rights reserved.
      </footer>
    </main>
  );
}