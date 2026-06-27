export type ContactKind =
  | "call"
  | "email"
  | "whatsapp"
  | "linkedin"
  | "explore";

export type ContactLink = {
  type: ContactKind;
  label: string;
  href: string;
};

export type PersonProfile = {
  slug: string;
  fullName: string;
  professionalTitle: string;
  headline: string;
  summary: string;
  contacts: ContactLink[];
  affiliatedCompanySlugs: string[];
};

export type CompanyProfile = {
  slug: string;
  name: string;
  summary: string;
};

export type ProductProfile = {
  slug: string;
  name: string;
  summary: string;
};
