"use client";

import { useState } from "react";
import { SiMaildotru, SiGithub, SiInstagram, SiLinkedin } from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';

export default function Contact() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      id="contact"
      className="py-12 px-6 md:px-12 w-full mx-auto shadow border border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-800/30 sm:rounded-xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Contact Info / Socials */}
        <div className="flex flex-col justify-between h-full">
          <div className="mb-6">
            <h2 className="text-3xl text-center sm:text-5xl sm:text-left uppercase font-bold text-slate-900 dark:text-white mb-2">
              Get in Touch
            </h2>
            <p className="text-sm sm:text-base text-center sm:text-left text-slate-600 dark:text-slate-400">
              Feel free to reach out for collaborations or just a friendly hello!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <div className="text-sm sm:text-base text-slate-900 dark:text-white font-semibold">
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
                        <div className="text-sm sm:text-base text-slate-900 dark:text-white font-semibold">
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
                  <div className="text-sm sm:text-base text-slate-900 dark:text-white font-semibold">
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
                  <div className="text-sm sm:text-base text-slate-900 dark:text-white font-semibold">
                    Instagram
                  </div>
                </div>
              </div>
              <FiExternalLink className="text-slate-400 group-hover:text-blue-500" />
            </a>
          </div>
        </div>
        {/* Right: Contact Form */}
        <form
          action="https://formspree.io/f/mpwjvezn"
          method="POST"
          className="bg-white/80 dark:bg-slate-800/30 border border-slate-200 dark:border-white/10 rounded-2xl shadow backdrop-blur p-6 flex flex-col gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const data = new FormData(form);
            const res = await fetch(form.action, {
              method: "POST",
              body: data,
              headers: { Accept: "application/json" },
            });
            if (res.ok) {
              setShowModal(true);
              form.reset();
            }
          }}
        >
          {/* ...your form fields... */}
          <label className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium" htmlFor="email">
            Email
            <input
              className="font-light mt-2 mb-2 sm:mb-4 w-full rounded-lg bg-transparent border border-slate-200 dark:border-white/10 px-4 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="email"
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </label>
          <label className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium" htmlFor="subject">
            Subject
            <input
              className="font-light mt-2 mb-2 sm:mb-4 w-full rounded-lg bg-transparent border border-slate-200 dark:border-white/10 px-4 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="subject"
              type="text"
              name="subject"
              placeholder="Subject"
              required
            />
          </label>
          <label className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium" htmlFor="message">
            Message
            <textarea
              className="font-light mt-2 max-h-80 overflow-y-auto w-full rounded-lg bg-transparent border border-slate-200 dark:border-white/10 px-4 py-2 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              id="message"
              name="message"
              rows={4}
              placeholder="Your Message"
              required
            ></textarea>
          </label>
          <button
            className="mt-2 sm:mt-4 rounded-xl bg-blue-700 hover:bg-gradient-to-t hover:from-blue-700 hover:to-blue-500 text-white font-bold py-2 px-6 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg text-center">
            <div className="text-green-600 dark:text-green-400 font-semibold mb-4">
              Thank you! Your message has been sent.
            </div>
            <button
              className="mt-2 px-6 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}