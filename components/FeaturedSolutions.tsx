type Solution = {
  name: string;
  subtitle: string;
};

const solutions: Solution[] = [
  {
    name: "Webstream ACP",
    subtitle: "Application continuity for Windows workloads in modern environments.",
  },
  {
    name: "Enterprise Integration",
    subtitle: "Connecting core platforms, data flows, and operational systems.",
  },
  {
    name: "Warehouse Mobility",
    subtitle: "Mobile workflows that improve speed, accuracy, and floor visibility.",
  },
  {
    name: "PrintRelay",
    subtitle: "Reliable print distribution across enterprise operations and endpoints.",
  },
];

export function FeaturedSolutions() {
  return (
    <section className="space-y-5 sm:space-y-6 lg:space-y-7">
      <div>
        <h2 className="text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl lg:text-[2rem]">
          Featured Solutions
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {solutions.map((solution) => (
          <article
            key={solution.name}
            className="min-h-[9.5rem] rounded-[1.85rem] bg-slate-50/65 px-5 py-5 ring-1 ring-slate-200/70 sm:px-6 sm:py-6"
          >
            <div className="space-y-3">
              <h3 className="text-xl font-medium tracking-[-0.025em] text-slate-950">
                {solution.name}
              </h3>
              <p className="text-sm leading-7 text-slate-600 sm:text-[0.95rem]">
                {solution.subtitle}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
