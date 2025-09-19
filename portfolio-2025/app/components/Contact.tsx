import { SiMaildotru, SiGithub, SiInstagram, SiLinkedin } from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-12 px-4 sm:px-6 md:px-12 w-full mx-auto shadow border border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-800/30 sm:rounded-xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Contact Info / Socials */}
        <div className="flex flex-col justify-between h-full">
          <div className="mb-6">
            <h2 className="text-3xl text-center sm:text-5xl sm:text-left uppercase font-bold text-slate-900 dark:text-white mb-2">
              Get in Touch
            </h2>
            <p className="text-center sm:text-left text-slate-600 dark:text-slate-400">
              Feel free to reach out for collaborations or just a friendly hello!
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <a
              href="mailto:josuahcastro1@gmail.com"
              className="flex items-center justify-between bg-white/70 dark:bg-slate-800/30 hover:bg-blue-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 transition shadow backdrop-blur group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <span className="bg-blue-100 dark:bg-white/10 p-3 rounded-xl text-blue-500">
                  <SiMaildotru size={22} />
                </span>
                <div>
                  <div className="text-slate-900 dark:text-white font-semibold">
                    Email
                  </div>
                </div>
              </div>
              <FiExternalLink className="text-slate-400 group-hover:text-blue-500" />
            </a>
            {/* LinkedIn */}
            <a
                href="https://www.linkedin.com/in/patrick-josuah-castro/"
                className="flex items-center justify-between bg-white/70 dark:bg-slate-800/30 hover:bg-blue-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 transition shadow backdrop-blur group"
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="flex items-center gap-4">
                    <span className="bg-blue-100 dark:bg-white/10 p-3 rounded-xl text-blue-500">
                        <SiLinkedin size={22} />
                    </span>
                    <div>
                        <div className="text-slate-900 dark:text-white font-semibold">
                            LinkedIn
                        </div>
                    </div>
                </div>
                <FiExternalLink className="text-slate-400 group-hover:text-blue-500" />
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/PatriusCastro"
              className="flex items-center justify-between bg-white/70 dark:bg-slate-800/30 hover:bg-gray-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 transition shadow backdrop-blur group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <span className="bg-gray-200 dark:bg-white/10 p-3 rounded-xl text-slate-800 dark:text-slate-200">
                  <SiGithub size={22} />
                </span>
                <div>
                  <div className="text-slate-900 dark:text-white font-semibold">
                    GitHub
                  </div>
                </div>
              </div>
              <FiExternalLink className="text-slate-400 group-hover:text-blue-500" />
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com/_patissss"
              className="flex items-center justify-between bg-white/70 dark:bg-slate-800/30 hover:bg-pink-50 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-4 transition shadow backdrop-blur group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-4">
                <span className="bg-pink-100 dark:bg-white/10 p-3 rounded-xl text-pink-500">
                  <SiInstagram size={22} />
                </span>
                <div>
                  <div className="text-slate-900 dark:text-white font-semibold">
                    Instagram
                  </div>
                </div>
              </div>
              <FiExternalLink className="text-slate-400 group-hover:text-blue-500" />
            </a>
          </div>
        </div>
        {/* Right: Contact Form */}
        <form className="bg-white/80 dark:bg-slate-800/30 border border-slate-200 dark:border-white/10 rounded-2xl shadow backdrop-blur p-6 flex flex-col gap-2">
          <label
            className="text-slate-800 dark:text-slate-200 font-medium"
            htmlFor="name"
          >
            Name
            <input
              className="mt-2 mb-2 sm:mb-4 w-full rounded-lg bg-transparent border border-slate-200 dark:border-white/10 px-4 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="name"
              type="text"
              placeholder="Your Name"
              required
            />
          </label>
          <label
            className="text-slate-800 dark:text-slate-200 font-medium"
            htmlFor="email"
          >
            Email
            <input
              className="mt-2 mb-2 sm:mb-4 w-full rounded-lg bg-transparent border border-slate-200 dark:border-white/10 px-4 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="email"
              type="email"
              placeholder="Your Email"
              required
            />
          </label>
          <label
            className="text-slate-800 dark:text-slate-200 font-medium"
            htmlFor="message"
          >
            Message
            <textarea
              className="mt-2 max-h-80 overflow-y-auto w-full rounded-lg bg-transparent border border-slate-200 dark:border-white/10 px-4 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="message"
              rows={4}
              placeholder="Your Message"
              required
            ></textarea>
          </label>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}