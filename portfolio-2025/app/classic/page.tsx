import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import About from "../components/About";
import Skills from "../components/Skills";
import Project from "../components/Project";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { getGithubStats } from "../lib/github";
import FadeInSection from "../components/FadeInSection";
import type { Metadata } from "next";

const ogImage = { url: "/og-classic.png", width: 1200, height: 630, alt: "Patrius Castro's classic one-page portfolio" };

// Child metadata replaces openGraph/twitter wholesale, so this restates them with the classic screenshot.
export const metadata: Metadata = {
  title: "Patrius Castro — Classic",
  openGraph: { title: "Patrius Castro — Classic", description: "The classic one-page version of Patrick Josuah Castro's portfolio.", url: "/classic", siteName: "Patrius Castro", type: "website", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Patrius Castro — Classic", images: [ogImage.url] },
};

export default async function Home() {
  const { projectCount, stars } = await getGithubStats();

  return (
    <div className="min-h-screen relative z-10 sm:px-8 md:px-12 lg:px-20 xl:px-36 2xl:px-52">
      <Navbar />
      <main>
        <Hero />
        <FadeInSection><Stats projectCount={projectCount} stars={stars} /></FadeInSection>
        <FadeInSection><About /></FadeInSection>
        <FadeInSection><Skills /></FadeInSection>
        <FadeInSection><Project /></FadeInSection>
        <FadeInSection><Contact /></FadeInSection>
      </main>
      <Footer />
    </div>
  );
}
