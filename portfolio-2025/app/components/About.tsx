export default function About() {
  return (
    <section id="about" className="min-h-[60vh] py-20 px-6 flex flex-col justify-center items-center mb-20">
      <div className="text-center max-w-2xl">
        <div className="section-label justify-center mb-4">about</div>
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 tracking-tight text-[var(--text)]">About Me</h2>
        <p className="text-sm sm:text-base mb-5 leading-relaxed text-[var(--text-sub)]">
          I'm Patrick Josuah Castro, a passionate web developer specializing in
          frontend development. With a strong foundation in React and Tailwind
          CSS, I create responsive and user-friendly web applications. I love
          learning new ideas and turn it into reality through code and am always eager to learn
          new technologies and improve my skills as a developer.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-[var(--text-sub)]">
          I also enjoy exploring new tech trends and collaborating with other developers.
          Let's build something amazing together! I am open in working in a team 
          or as a freelancer, so feel free to reach out if you have an interesting 
          project or opportunity in mind.
        </p>
      </div>
    </section>
  );
}