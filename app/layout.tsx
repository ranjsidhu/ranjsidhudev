import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ranjsidhu.dev"),
  title: "Ranj Sidhu — Portfolio",
  description: "Personal portfolio of Ranj Sidhu, Software Engineer.",
  openGraph: {
    title: "Ranj Sidhu — Portfolio",
    description:
      "Selected work, writing, and interests by software engineer Ranj Sidhu.",
    url: "https://ranjsidhu.dev",
    siteName: "Ranj Sidhu",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ranj Sidhu — Portfolio",
      },
    ],
    locale: "en_UK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="pt-16">{children}</main>
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
