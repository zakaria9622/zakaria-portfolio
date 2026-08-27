import type { Metadata } from "next";
import {
  DM_Sans,
  IBM_Plex_Mono,
  Newsreader,
} from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/data/profile";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const siteTitle = "Zakaria Maachou | Business Analyst · Data & Reporting";
const siteDescription =
  "Portfolio de Zakaria Maachou, Business Analyst spécialisé en analyse de données, KPI, reporting, Business Intelligence et aide à la décision.";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.zakariamaachou.com/#website",
      url: "https://www.zakariamaachou.com/",
      name: "Portfolio Zakaria Maachou",
      description: siteDescription,
      inLanguage: "fr-FR",
      author: {
        "@id": "https://www.zakariamaachou.com/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://www.zakariamaachou.com/#person",
      name: profile.name,
      url: "https://www.zakariamaachou.com/",
      jobTitle: "Business Analyst",
      description: profile.tagline,
      sameAs: [profile.linkedin, profile.github],
      knowsAbout: [
        "Business Analysis",
        "Data Analysis",
        "Business Intelligence",
        "KPI",
        "Performance Reporting",
        "SQL",
        "Python",
        "Tableau",
        "Power BI",
        "Excel",
        "Data Quality",
        "ETL",
        "CRM Analytics",
        "dbt",
        "DuckDB",
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zakariamaachou.com"),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "Portfolio Zakaria Maachou",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "Zakaria Maachou | Business Analyst · Data & Reporting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og/home.png",
        alt: "Zakaria Maachou | Business Analyst · Data & Reporting",
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
      lang="fr"
      className={`${dmSans.variable} ${ibmPlexMono.variable} ${newsreader.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-navy-950 font-body text-slate-300 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main-content"
          className="sr-only fixed top-4 left-4 z-[60] rounded-md bg-ink-950 px-4 py-3 font-body text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-cyan-200"
        >
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
