import type { CompanyProfile } from "@/types/content";

type CompanyCardProps = {
  company: CompanyProfile;
};

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <article className="rounded-[1.75rem] bg-white px-6 py-6 ring-1 ring-slate-200/55 sm:px-7 sm:py-7">
      <div className="space-y-6">
        <div className="flex h-14 w-32 items-center rounded-xl bg-slate-50/85 px-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-300">
          Logo
        </div>
        <div className="space-y-3">
          <h3 className="font-serif text-[1.45rem] font-medium leading-tight tracking-[-0.03em] text-slate-800 sm:text-[1.6rem]">
            {company.name}
          </h3>
          <p className="max-w-xl text-base leading-8 text-slate-600">
            {company.summary}
          </p>
        </div>
      </div>
    </article>
  );
}
