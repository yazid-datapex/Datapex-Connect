import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompanyCards } from "@/components/CompanyCards";
import { ContactButtons } from "@/components/ContactButtons";
import { FeaturedSolutions } from "@/components/FeaturedSolutions";
import { Hero } from "@/components/Hero";
import { getCompaniesBySlugs } from "@/lib/companies";
import { getPersonBySlug, getPersonSlugs } from "@/lib/people";

type ProfilePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function LogoPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-12 min-w-32 items-center justify-center rounded-full bg-slate-50 px-5 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-400 ring-1 ring-slate-200/80 sm:h-14 sm:min-w-36">
      {label}
    </div>
  );
}

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
      title: "Profile not found | Datapex Connect",
    };
  }

  return {
    title: profile.fullName + " | Datapex Connect",
    description: profile.headline,
  };
}

export default async function ProfilePage(props: ProfilePageProps) {
  const { slug } = await props.params;
  const profile = getPersonBySlug(slug);

  if (!profile) {
    notFound();
  }

  const companies = getCompaniesBySlugs(profile.affiliatedCompanySlugs);

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-16">
        <div className="space-y-12 sm:space-y-14 lg:space-y-20">
          <header className="flex items-center justify-between gap-4 py-1">
            <LogoPlaceholder label="Audentia Logo" />
            <LogoPlaceholder label="Datapex Logo" />
          </header>
          <Hero profile={profile} />
          <ContactButtons contacts={profile.contacts} />
          <FeaturedSolutions />
          <CompanyCards companies={companies} />
        </div>
      </div>
    </main>
  );
}
