import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

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
      <body className={`${merriweather.variable} ${inter.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}