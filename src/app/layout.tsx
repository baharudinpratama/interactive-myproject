import { LanguageProvider } from '@/app/contexts/language';
import "@/app/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from '@/app/providers';

const proximaNova = localFont({
  src: [
    {
      path: "./fonts/ProximaNovaRegular.otf",
      weight: "100 900",
    },
    {
      path: "./fonts/ProximaNovaMedium.otf",
      weight: "500",
    },
    {
      path: "./fonts/ProximaNovaSemibold.otf",
      weight: "600",
    },
    {
      path: "./fonts/ProximaNovaBold.otf",
      weight: "700",
    },
  ],
});

export const metadata: Metadata = {
  title: "My Project",
  description: "App for task manager",
  icons: "/icon-myproject-rounded.png",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${proximaNova.className} antialiased`}>
        <Providers>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
