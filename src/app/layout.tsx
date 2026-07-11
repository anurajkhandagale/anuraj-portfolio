import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
 });

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anuraj Khandagale | Backend Software Engineer",
  description: "Computer Engineering student specializing in Java Backend Development, Spring Boot, REST APIs, and scalable distributed systems.",
  authors: [{ name: "Anuraj Laxman Khandagale" }],
  keywords: ["Anuraj Khandagale", "Backend Engineer", "Java Developer", "Spring Boot", "Software Engineer Portfolio", "Computer Engineering Student"],
  openGraph: {
    title: "Anuraj Khandagale | Backend Software Engineer",
    description: "Computer Engineering student specializing in Java Backend Development, Spring Boot, and scalable distributed systems.",
    type: "website",
    locale: "en_US",
    url: "https://github.com/anurajkhandagale",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anuraj Khandagale | Backend Software Engineer",
    description: "Computer Engineering student specializing in Java Backend Development, Spring Boot, and scalable distributed systems.",
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
    "jobTitle": "Backend Software Engineer",
    "url": "https://github.com/anurajkhandagale",
    "sameAs": [
      "https://linkedin.com/in/anuraj-khandagale-10020732",
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
      "Database Design", 
      "System Design", 
      "Data Structures & Algorithms"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans antialiased min-h-screen bg-slate-50 dark:bg-[#0a0f1d] text-slate-900 dark:text-slate-100 transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
