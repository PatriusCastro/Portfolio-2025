export default function About() {
  return (
    <section id="about" className="min-h-[60vh] py-16 px-6 flex flex-col justify-center items-center">
      <div className="text-center max-w-2xl">
        <div className="section-label justify-center mb-4">about</div>
        <h2
          className="text-3xl sm:text-5xl font-extrabold mb-6 tracking-tight"
          style={{ color: "var(--text)" }}
        >
          About Me
        </h2>
        <p className="text-sm sm:text-base mb-5 leading-relaxed" style={{ color: "var(--text-sub)" }}>
          I'm Patrick Josuah Castro, a passionate web developer specializing in
          frontend development. With a strong foundation in React and Tailwind
          CSS, I create responsive and user-friendly web applications. I love
          turning ideas into reality through code and am always eager to learn
          new technologies and improve my skills as a software developer.
        </p>
        <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-sub)" }}>
          When I'm not coding, I enjoy exploring new tech trends, contributing
          to open-source projects, and collaborating with other developers.
          Let's build something amazing together!
        </p>
      </div>
    </section>
  );
}