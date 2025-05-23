import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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
  title: "Ranj Sidhu",
  description: "Coming Soon",
  openGraph: {
    title: "Ranj Sidhu | Software Engineer",
    description: "A new journey in software engineering excellence",
    url: "https://ranjsidhu.dev",
    siteName: "Ranj Sidhu",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Ranj Sidhu - Software Engineer",
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
