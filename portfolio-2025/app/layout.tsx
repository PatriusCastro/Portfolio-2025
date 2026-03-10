import type { Metadata } from "next";
import { Space_Mono, Sora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../theme/ThemeProvider";

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patrius Castro",
  description: "Patrick Josuah Castro's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <body style={{ fontFamily: "var(--font-body, 'Sora', sans-serif)" }}>
        <ThemeProvider enableSystem={true} defaultTheme="system">
          <div className="dot-grid" />
          <div className="vignette" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}