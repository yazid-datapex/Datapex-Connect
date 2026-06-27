import type { PersonProfile } from "@/types/content";

type HeroProps = {
  profile: Pick<
    PersonProfile,
    "fullName" | "professionalTitle" | "headline" | "summary"
  >;
};

export function Hero({ profile }: HeroProps) {
  return (
    <section className="pt-3 sm:pt-4 lg:pt-6">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.95fr)_minmax(15rem,0.72fr)] lg:gap-18 xl:gap-20">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-slate-500">
            {profile.professionalTitle}
          </p>
          <div className="space-y-5 sm:space-y-6">
            <h1 className="max-w-5xl text-4xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-5xl sm:leading-none lg:text-7xl lg:leading-[0.94]">
              {profile.fullName}
            </h1>
            <p className="max-w-4xl text-xl leading-9 tracking-[-0.025em] text-slate-700 sm:text-2xl sm:leading-10 lg:max-w-[48rem] lg:text-[2.1rem] lg:leading-[1.35]">
              {profile.headline}
            </p>
          </div>
        </div>
        <div className="self-end lg:pb-2">
          <p className="max-w-sm text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            {profile.summary}
          </p>
        </div>
      </div>
    </section>
  );
}
