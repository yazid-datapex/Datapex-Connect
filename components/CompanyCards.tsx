import { CompanyCard } from "@/components/CompanyCard";
import type { CompanyProfile } from "@/types/content";

type CompanyCardsProps = {
  companies: CompanyProfile[];
};

export function CompanyCards({ companies }: CompanyCardsProps) {
  if (companies.length === 0) {
    return null;
  }

  return (
    <section className="space-y-5 sm:space-y-6 lg:space-y-7">
      <div>
        <h2 className="font-serif text-3xl leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[2.8rem]">
          Professional Affiliations
        </h2>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        {companies.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>
    </section>
  );
}
