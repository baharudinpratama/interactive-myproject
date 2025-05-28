"use client";

import { ModalProvider } from "@/app/contexts/modal";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
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
        <ToastProvider placement={"top-right"} />
        <ModalProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ModalProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  );
}
