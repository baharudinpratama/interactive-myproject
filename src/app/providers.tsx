"use client";

import { HeroUIProvider } from "@heroui/system";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";
import { registerIcons } from "./components/register-icon";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerIcons();
  }, []);

  return (
    <NextThemesProvider defaultTheme="light">
      <HeroUIProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
