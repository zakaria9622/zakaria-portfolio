import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/data/profile";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.zakariamaachou.com/#website",
      url: "https://www.zakariamaachou.com/",
      name: "Zakaria Maachou Portfolio",
      description:
        "Marketing Data Analyst specializing in growth, acquisition, conversion and retention. Explore SQL, GA4, Tableau, Python and CRM analytics case studies.",
      inLanguage: "en",
      author: {
        "@id": "https://www.zakariamaachou.com/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://www.zakariamaachou.com/#person",
      name: profile.name,
      url: "https://www.zakariamaachou.com/",
      jobTitle: profile.title,
      sameAs: [profile.linkedin, profile.github],
      knowsAbout: [
        "Marketing Analytics",
        "Growth Analytics",
        "Acquisition Analytics",
        "Funnel Analytics",
        "Conversion Analytics",
        "Retention Analytics",
        "CRM Analytics",
        "SQL",
        "GA4",
        "Tableau",
        "Python",
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zakariamaachou.com"),
  title: "Zakaria Maachou | Marketing Data Analyst",
  description:
    "Marketing Data Analyst specializing in growth, acquisition, conversion and retention. Explore SQL, GA4, Tableau, Python and CRM analytics case studies.",
  openGraph: {
    title: "Zakaria Maachou | Marketing Data Analyst",
    description:
      "Growth, acquisition, conversion and retention analytics through evidence-led marketing data case studies.",
    url: "/",
    siteName: "Zakaria Maachou Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 627,
        alt: "Zakaria Maachou | Marketing Data Analyst",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zakaria Maachou | Marketing Data Analyst",
    description:
      "Marketing data case studies covering acquisition, funnel conversion, CRM and retention.",
    images: [
      {
        url: "/og/home.png",
        alt: "Zakaria Maachou | Marketing Data Analyst",
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
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${ibmPlexMono.variable} scroll-smooth`}
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
          Skip to main content
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
