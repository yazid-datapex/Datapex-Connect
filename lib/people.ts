import { yazid } from "@/content/people/yazid";
import type { PersonProfile } from "@/types/content";

const people: PersonProfile[] = [yazid];

export function getPeople() {
  return people;
}

export function getPersonBySlug(slug: string) {
  return people.find((person) => person.slug === slug);
}

export function getPersonSlugs() {
  return people.map((person) => person.slug);
}
