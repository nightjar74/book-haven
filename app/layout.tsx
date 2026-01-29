import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

import localFont from "next/font/local";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { SpeculationRules } from "./speculationRules";
import { IBM_Plex_Serif } from "next/font/google";
import { I18nProvider } from "./providers/I18nProvider";
import { cookies } from "next/headers";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--ibm-plex-serif",
});

const ibmPlexSans = localFont({
  src: [
    { path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const bebasNeue = localFont({
  src: [
    { path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookHaven",
  description: "BookHaven is a book borrowing library management solution.",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  const cookieStore = await cookies();

  const locale = cookieStore.get("NEXT_LOCALE")?.value || "en";
  let translations;
  try {
    switch (locale) {
      case "fr":
        translations = (await import("@/messages/fr.json")).default;
        break;
      case "de":
        translations = (await import("@/messages/de.json")).default;
        break;
      default:
        translations = (await import("@/messages/en.json")).default;
    }
  } catch (error) {
    translations = (await import("@/messages/en.json")).default;
  }

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${ibmPlexSans.className} ${bebasNeue.variable} ${ibmPlexSerif.variable} antialiased`}
        >
          <I18nProvider locale={locale} translations={translations}>
            <SpeculationRules prerenderAllBooksOnHover={true} />
            {children}

            <Toaster />
          </I18nProvider>
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
