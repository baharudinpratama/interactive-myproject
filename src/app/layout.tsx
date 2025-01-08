import { Providers } from "@/app/components/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${proximaNova.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
