export default function Hero() {
  return (
    <section className="h-[80vh] px-[2rem] flex flex-col justify-center items-center">
      {/* Hero Texts */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2">Patrius Castro</h1>
        <p className="text-sm sm:text-md mb-6">
          Web Developer specializing in Frontend Development with React & Tailwind
        </p>
      </div>

      {/* Hero Buttons */}
      <div className="gap-4 flex">
        <button className="px-4 py-2 text-sm sm:text-md bg-blue-600 hover:bg-blue-500 text-white">
          Contact Me
        </button>
        <button className="px-4 py-2 text-sm sm:text-md hover:bg-slate-300 dark:hover:bg-slate-800 border">
          Download CV
        </button>
      </div>
    </section>
  );
}