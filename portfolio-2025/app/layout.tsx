import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../theme/ThemeProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
// Sora only sets the big metallic name; the UI reads better in Geist.
const sora = Sora({ subsets: ["latin"], weight: "800", variable: "--font-display", display: "swap" });

const title = "Patrius Castro — Full-Stack Developer";
const description =
  "Portfolio of Patrick Josuah Castro, a full-stack developer. Open projects like Pulo, Prepon and Todoro on a desktop-style site with windows, a dock and a Dynamic Island.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL("https://patriuscastro.netlify.app/"),
  openGraph: {
    title,
    description,
    url: "https://patriuscastro.netlify.app/",
    siteName: "Patrius Castro",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Patrius Castro's portfolio as a desktop: project explorer and notepad windows, a dock, and a Dynamic Island showing Open to work",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${sora.variable} antialiased`}
      suppressHydrationWarning
    >
      <body style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}>
        {/* Scroll-reveal sections render at opacity 0; show them when JS is off */}
        <noscript>
          <style>{`[style*="opacity"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ThemeProvider enableSystem={true} defaultTheme="system">
          <div className="vignette" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}