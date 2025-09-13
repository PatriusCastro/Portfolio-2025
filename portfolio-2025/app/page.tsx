import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";

export default function Home() {
  return (
    <div className="md:px-[2rem] lg:px-[4rem] xl:px-[14rem] bg-linear-135 from-slate-100 to-slate-200 text-slate-900 dark:text-slate-200 dark:bg-linear-135 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Stats />
      <About />
    </div>
  );
}
