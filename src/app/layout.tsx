import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Great_Vibes, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const elegantCursive = Great_Vibes({
  variable: "--font-cursive",
  subsets: ["latin"],
  weight: ["400"],
});

const appleHindi = Tiro_Devanagari_Hindi({
  variable: "--font-apple-hindi",
  subsets: ["devanagari", "latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Anuraj Khandagale | Java Backend Software Engineer",
  description: "Computer Engineering Graduate from Savitribai Phule Pune University (SPPU, 8.12 CGPA) specializing in Java Backend Development, Spring Boot, REST APIs, and scalable distributed systems.",
  authors: [{ name: "Anuraj Laxman Khandagale" }],
  keywords: ["Anuraj Khandagale", "Backend Engineer", "Java Developer", "Spring Boot", "Software Engineer Portfolio", "SPPU Computer Engineering Graduate"],
  openGraph: {
    title: "Anuraj Khandagale | Java Backend Software Engineer",
    description: "Computer Engineering Graduate (SPPU, 8.12 CGPA) specializing in Java, Spring Boot, and scalable backend architecture.",
    type: "website",
    locale: "en_US",
    url: "https://github.com/anurajkhandagale",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuraj Khandagale | Java Backend Software Engineer",
    description: "Computer Engineering Graduate (SPPU, 8.12 CGPA) specializing in Java, Spring Boot, and scalable backend architecture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Anuraj Laxman Khandagale",
    "jobTitle": "Java Backend Software Engineer",
    "url": "https://github.com/anurajkhandagale",
    "sameAs": [
      "https://linkedin.com/in/anuraj-khandagale-10020732b",
      "https://github.com/anurajkhandagale"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Savitribai Phule Pune University (SPPU)"
    },
    "knowsAbout": [
      "Java", 
      "Spring Boot", 
      "REST APIs", 
      "SQL", 
      "PostgreSQL",
      "MySQL",
      "Data Structures and Algorithms"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${elegantCursive.variable} ${appleHindi.variable} font-sans bg-[#030306] text-slate-100 antialiased overflow-x-hidden selection:bg-[#d4a574]/30 selection:text-[#d4a574]`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
