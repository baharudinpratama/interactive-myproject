"use client";

import { registerIcons } from "./components/register-icon";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerIcons();
  }, []);

  return (
    <NextThemesProvider defaultTheme="light">
      <NextUIProvider>
        <SessionProvider>
          {children}
        </SessionProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}
