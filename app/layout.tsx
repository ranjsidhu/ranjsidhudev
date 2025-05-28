import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import Script from "next/script";

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
  title: {
    default: "Ranj Sidhu | Software Engineer",
    template: "%s | Ranj Sidhu",
  },
  description:
    "Software Engineer specializing in full-stack development, with expertise in modern web technologies and best practices.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Ranj Sidhu" }],
  creator: "Ranj Sidhu",
  publisher: "Ranj Sidhu",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Ranj Sidhu | Software Engineer",
    description:
      "Software Engineer specializing in full-stack development, with expertise in modern web technologies and best practices.",
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
  twitter: {
    card: "summary_large_image",
    title: "Ranj Sidhu | Software Engineer",
    description:
      "Software Engineer specializing in full-stack development, with expertise in modern web technologies and best practices.",
    images: ["/og.png"],
    creator: "@ranjsidhu",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ranj Sidhu",
  url: "https://ranjsidhu.dev",
  jobTitle: "Software Engineer",
  description:
    "Software Engineer specializing in full-stack development, with expertise in modern web technologies and best practices.",
  sameAs: [
    "https://github.com/ranjsidhu",
    "https://linkedin.com/in/ranjsidhu",
    "https://twitter.com/ranjsidhu",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS Feed for Ranj Sidhu"
          href="/feed.xml"
        />
        <meta name="theme-color" content="#000000" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
