import type { ContactLink } from "@/types/content";

const contacts: ContactLink[] = [
  {
    type: "email",
    label: "Contact",
    href: "mailto:hello@datapex.my",
  },
];

export const siteConfig = {
  name: "Datapex Connect",
  contacts,
} as const;
