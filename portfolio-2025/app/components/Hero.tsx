export default function Hero() {
  return (
    <section className="h-[90vh] flex flex-col justify-center items-center">
      {/* Hero Texts */}
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-2">Patrius Castro</h1>
        <p className="mb-6">
          Web Developer specializing in Frontend Development with React & Tailwind
        </p>
      </div>

      {/* Hero Buttons */}
      <div className="gap-4 flex">
        <button className="bg-blue-600 hover:bg-blue-500 font-bold px-4 py-2 rounded-xl text-white">
          Contact Me
        </button>
        <button className="hover:bg-slate-800 font-bold border px-4 py-2 rounded-xl">
          Download CV
        </button>
      </div>
    </section>
  );
}