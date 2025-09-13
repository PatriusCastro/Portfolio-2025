import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="bg-slate-200 text-slate-800 dark:text-slate-200 dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <Hero />
    </div>
  );
}
