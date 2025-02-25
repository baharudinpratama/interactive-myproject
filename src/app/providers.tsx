"use client";

import { registerIcons } from "./[locale]/components/register-icon";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerIcons();
  }, []);

  return (
    <NextThemesProvider defaultTheme="light">
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </NextThemesProvider>
  );
}
