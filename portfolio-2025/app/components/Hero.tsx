"use client";

export default function Hero() {
  return (
    <section className="h-[80vh] flex flex-col items-center justify-center px-8">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2">
          <span className="hero-metallic">Patrius Castro</span>
        </h1>
        <p className="text-base sm:text-lg xl:text-xl mb-6">
          Web Developer specializing in Frontend Development with React & Tailwind
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md hover:shadow-lg transition"
        >
          Contact Me
        </button>
        <a
          href="/files/Patrick-Josuah-Castro-CV.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
