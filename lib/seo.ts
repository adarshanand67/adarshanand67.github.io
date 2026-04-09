import { siteConfig } from "@/lib/config";
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.author.role,
    email: siteConfig.author.email,
    url: siteConfig.url,
    sameAs: [
      `https://github.com/${siteConfig.author.github}`,
      `https://linkedin.com/in/${siteConfig.author.linkedin}`,
    ],
    worksFor: {
      "@type": "Organization",
      name: "Trellix",
      url: "https://trellix.com",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Indian Institute of Technology Goa",
      url: "https://iitgoa.ac.in",
    },
    knowsAbout: siteConfig.seo.keywords,
  };
}
export function generateBlogPostSchema(post: {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/articles/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/articles/${post.slug}`,
    },
  };
}
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    author: {
      "@type": "Person",
      name: siteConfig.author.name,
    },
    inLanguage: "en-US",
  };
}
