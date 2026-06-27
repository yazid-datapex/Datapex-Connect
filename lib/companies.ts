import { audentia } from "@/content/companies/audentia";
import { datapex } from "@/content/companies/datapex";
import type { CompanyProfile } from "@/types/content";

const companies: CompanyProfile[] = [datapex, audentia];

export function getCompanies() {
  return companies;
}

export function getCompanyBySlug(slug: string) {
  return companies.find((company) => company.slug === slug);
}

export function getCompaniesBySlugs(slugs: string[]) {
  return slugs
    .map((slug) => getCompanyBySlug(slug))
    .filter((company): company is CompanyProfile => Boolean(company));
}
