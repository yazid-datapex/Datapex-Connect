import Image from "next/image";
import type { CompanyProfile } from "@/types/content";

type CompanyCardProps = {
  company: CompanyProfile;
};

function CompanyLogo({ company }: CompanyCardProps) {
  const alt = company.name + " logo";
  const isSvg = company.logo.endsWith(".svg");

  return (
    <div className="relative h-10 w-[10.5rem] sm:h-11 sm:w-[11rem]">
      <Image
        src={company.logo}
        alt={alt}
        fill
        sizes="176px"
        unoptimized={isSvg}
        className="object-contain object-left"
      />
    </div>
  );
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <article className="rounded-[1.75rem] bg-white px-6 py-6 ring-1 ring-slate-200/55 sm:px-7 sm:py-7">
      <div className="space-y-5">
        <div className="flex min-h-12 items-center">
          <CompanyLogo company={company} />
        </div>
        <div className="space-y-3">
          <h3 className="font-serif text-[1.3rem] font-medium leading-tight tracking-[-0.03em] text-slate-800 sm:text-[1.45rem]">
            {company.name}
          </h3>
          <p className="max-w-xl text-base leading-8 text-slate-600">
            {company.summary}
          </p>
          <a
            href={company.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-sm font-medium tracking-[-0.01em] text-slate-700"
          >
            Learn more <span aria-hidden="true" className="ml-1">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
