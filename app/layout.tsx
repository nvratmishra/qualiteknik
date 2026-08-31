import type { Metadata } from "next";
import { Instrument_Serif, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConsoleEgg } from "@/components/ConsoleEgg";

/*
  Instrument Serif against JetBrains Mono: an editorial display face for the
  argument, a technical face for every figure and label. Deliberately not
  Space Grotesk or Inter — that is what the previous site used, and what every
  other AI consultancy uses.
*/
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Qualiteknik — AI & ML Engineering Built on Rigor",
    template: "%s — Qualiteknik",
  },
  description:
    "Qualiteknik designs, ships, and hardens machine learning systems for teams who can't afford to find out in production that the model doesn't hold up. Based in Toronto, Canada.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${publicSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ConsoleEgg />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
