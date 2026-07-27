import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import "./globals.css";

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Where craft meets conscious commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${merriweather.variable} ${inter.variable} font-inter bg-stone-50 text-stone-900`}>
        {children}
      </body>
    </html>
  );
}