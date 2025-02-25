import "@/app/globals.css";
import { Providers } from "@/app/providers";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import localFont from "next/font/local";
import { notFound } from "next/navigation";

const proximaNova = localFont({
  src: [
    {
      path: "../fonts/ProximaNovaRegular.otf",
      weight: "100 900",
    },
    {
      path: "../fonts/ProximaNovaMedium.otf",
      weight: "500",
    },
    {
      path: "../fonts/ProximaNovaSemibold.otf",
      weight: "600",
    },
    {
      path: "../fonts/ProximaNovaBold.otf",
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
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  if (!["en", "id"].includes(locale)) {
    notFound();
  }

  return (
    <html lang="en">
      <body className={`${proximaNova.className} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
