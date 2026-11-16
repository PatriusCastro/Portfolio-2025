"use client";

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";
import { MotionConfig } from "framer-motion";

export function ThemeProvider({ children, ...props }: ThemeProviderProps & { children: React.ReactNode }) {
  return (
    <NextThemesProvider {...props}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}
