import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zakaria-portfolio-vert.vercel.app"),
  title: "Zakaria Maachou - Data Analyst / BI Analyst Portfolio",
  description: "Data, BI & Performance portfolio and case studies.",
  openGraph: {
    title: "Zakaria Maachou",
    description: "Data, BI & Performance",
    url: "/",
    siteName: "Zakaria Maachou Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 627,
        alt: "Zakaria Maachou - Data, BI & Performance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zakaria Maachou",
    description: "Data, BI & Performance",
    images: [
      {
        url: "/og/home.png",
        alt: "Zakaria Maachou - Data, BI & Performance",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetBrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-navy-950 font-body text-slate-300 antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
