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
  metadataBase: new URL("https://www.zakariamaachou.com"),
  title: "Zakaria Maachou | Data Analyst, Business Intelligence & Business Analytics",
  description:
    "Portfolio of Zakaria Maachou, a Data Analyst specializing in Business Intelligence, Business Analytics, SQL, dashboards and actionable business recommendations.",
  openGraph: {
    title: "Zakaria Maachou | Data Analyst, Business Intelligence & Business Analytics",
    description:
      "Data Analytics, Business Intelligence and Business Analytics portfolio featuring SQL analysis, BI dashboards and business recommendations.",
    url: "/",
    siteName: "Zakaria Maachou Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 627,
        alt: "Zakaria Maachou — Data Analyst, Business Intelligence & Business Analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zakaria Maachou | Data Analyst, Business Intelligence & Business Analytics",
    description:
      "Data Analytics, Business Intelligence and Business Analytics portfolio featuring SQL analysis, BI dashboards and business recommendations.",
    images: [
      {
        url: "/og/home.png",
        alt: "Zakaria Maachou — Data Analyst, Business Intelligence & Business Analytics",
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
