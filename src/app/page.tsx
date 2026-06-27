import Link from "next/link";
import { getPeople } from "@/lib/people";

export default function Home() {
  const people = getPeople();

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Datapex Connect
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Profile directory
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Browse the first functional profile page built on the shared Datapex Connect content model.
            </p>
          </div>
        </section>
        <section className="grid gap-4 sm:grid-cols-2">
          {people.map((person) => (
            <Link
              key={person.slug}
              href={"/" + person.slug}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:bg-slate-50"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                  {person.fullName}
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  {person.professionalTitle}
                </p>
                <p className="text-sm leading-6 text-slate-600">{person.headline}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
