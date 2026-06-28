import type { Metadata } from "next";
import type { PersonProfile } from "@/types/content";

const SITE_NAME = "Datapex Connect";
const SITE_BASE_URL = new URL("https://connect.mydatapex.com");
const DEFAULT_DESCRIPTION =
  "Professional identity platform for enterprise introductions, solution conversations, and ongoing customer engagement.";
const DEFAULT_LOCALE = "en_AU";

function normalisePathname(pathname: string) {
  return pathname.startsWith("/") ? pathname : "/" + pathname;
}

function joinPathname(pathname: string, suffix: string) {
  const basePath = normalisePathname(pathname).replace(/\/$/, "");
  const cleanSuffix = suffix.replace(/^\//, "");
  return basePath + "/" + cleanSuffix;
}

export function getSiteName() {
  return SITE_NAME;
}

export function getSiteBaseUrl() {
  return SITE_BASE_URL;
}

export function getDefaultMetadataDescription() {
  return DEFAULT_DESCRIPTION;
}

export function buildCanonicalPath(pathname: string) {
  return normalisePathname(pathname);
}

export function buildAbsoluteUrl(pathname: string) {
  return new URL(buildCanonicalPath(pathname), SITE_BASE_URL).toString();
}

export function buildProfilePath(slug: string) {
  return buildCanonicalPath("/" + slug);
}

export function buildProfileTitle(profile: PersonProfile) {
  return profile.fullName + " | " + profile.professionalTitle;
}

export function buildProfileDescription(profile: PersonProfile) {
  return profile.headline || profile.summary || DEFAULT_DESCRIPTION;
}

export function buildProfileOgImagePath(slug: string) {
  return joinPathname(buildProfilePath(slug), "opengraph-image");
}

export function buildRootMetadata(): Metadata {
  return {
    applicationName: SITE_NAME,
    metadataBase: SITE_BASE_URL,
    title: {
      default: SITE_NAME,
      template: "%s | " + SITE_NAME,
    },
    description: DEFAULT_DESCRIPTION,
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [{ url: "/icon" }],
      shortcut: [{ url: "/icon" }],
      apple: [{ url: "/apple-icon" }],
    },
  };
}

export function buildProfileMetadata(profile: PersonProfile): Metadata {
  const pathname = buildProfilePath(profile.slug);
  const title = buildProfileTitle(profile);
  const description = buildProfileDescription(profile);

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title,
      description,
      url: pathname,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
