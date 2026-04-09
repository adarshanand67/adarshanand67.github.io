import type { Metadata, Viewport } from "next";
import { Assistant, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/seo";
import { ClientLayout } from "@/components/layout";
import { siteConfig } from "@/lib/config";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/seo";
import { getProfile, getBlogs, getProjects, getExperiences } from "@/lib/api";
import { Providers } from "@/components/providers";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  referrer: "no-referrer",
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Anand - SDE @Trellix",
    description:
      "Software Development Engineer @Trellix focusing on data security and C++.",
    images: ["/images/ogImage.png"],
  },
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
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, recentPosts, projects, experience] = await Promise.all([
    getProfile(),
    getBlogs().then((blogs) => blogs.slice(0, 3)), // Get recent posts
    getProjects(),
    getExperiences(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.github.com" />
        <link rel="dns-prefetch" href="https://cdn.myanimelist.net" />
        <link rel="alternate" type="application/rss+xml" title="Adarsh Anand — Blog" href="/rss.xml" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${assistant.variable} ${jetbrains.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <a href="#main-content" className="skip-to-content">Skip to content</a>
          <StructuredData data={generatePersonSchema()} />
          <StructuredData data={generateWebSiteSchema()} />
          <ClientLayout
            profile={profile}
            recentPosts={recentPosts}
            projects={projects}
            experience={experience}
          >
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
