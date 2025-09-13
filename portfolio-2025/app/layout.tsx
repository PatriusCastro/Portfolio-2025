import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../theme/ThemeProvider";

export const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className={`bg-white text-black dark:bg-black dark:text-white`}>
        <ThemeProvider enableSystem={true} defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
