import type { Metadata } from "next";
import { Cormorant_Garamond, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohamed Ajmal Ahmed — Full-stack developer",
  description:
    "Portfolio of Mohamed Ajmal Ahmed, a full-stack developer in Hulhumale. The path from Loopcraft to MindCo, selected work, education, skills, and awards.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${baskerville.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
