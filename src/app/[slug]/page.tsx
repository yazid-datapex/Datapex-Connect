import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyCards } from "@/components/CompanyCards";
import { ContactButtons } from "@/components/ContactButtons";
import { FeaturedSolutions } from "@/components/FeaturedSolutions";
import { Hero } from "@/components/Hero";
import {
  buildProfileQrCodeSvg,
  buildVCardDownloadHref,
  getProfileQrCodeDescription,
  getProfileUrl,
  getVCardFileName,
} from "@/lib/digital-identity";
import { buildProfileMetadata } from "@/lib/metadata";
import { getCompaniesBySlugs } from "@/lib/companies";
import { getPersonBySlug, getPersonSlugs } from "@/lib/people";

type ProfilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPersonSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: ProfilePageProps,
): Promise<Metadata> {
  const { slug } = await props.params;
  const profile = getPersonBySlug(slug);

  if (!profile) {
    return {
      title: {
        absolute: "Profile not found | Datapex Connect",
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return buildProfileMetadata(profile);
}

export default async function ProfilePage(props: ProfilePageProps) {
  const { slug } = await props.params;
  const profile = getPersonBySlug(slug);

  if (!profile) {
    notFound();
  }

  const companies = getCompaniesBySlugs(profile.affiliatedCompanySlugs);
  const saveContactHref = buildVCardDownloadHref(profile, companies);
  const saveContactFileName = getVCardFileName(profile);
  const profileUrl = getProfileUrl(profile);
  const qrCodeSvg = buildProfileQrCodeSvg(profile);
  const qrCodeDescription = getProfileQrCodeDescription(profile);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-16">
        <div className="space-y-12 pt-1 sm:space-y-14 sm:pt-2 lg:space-y-20 lg:pt-3">
          <Hero profile={profile} />
          <ContactButtons
            contacts={profile.contacts}
            saveContactHref={saveContactHref}
            saveContactFileName={saveContactFileName}
            profileUrl={profileUrl}
            qrCodeSvg={qrCodeSvg}
            qrCodeDescription={qrCodeDescription}
          />
          <FeaturedSolutions />
          <CompanyCards companies={companies} />
        </div>
      </div>
    </main>
  );
}
