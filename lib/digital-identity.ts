import { buildQrCodeSvg } from "@/lib/qr-code";
import type { CompanyProfile, ContactKind, ContactLink, PersonProfile } from "@/types/content";

type ContactValueMap = Partial<Record<ContactKind, ContactLink>>;

function escapeVCardValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function getNameParts(fullName: string) {
  const parts = fullName.trim().split(/\s+/);

  if (parts.length <= 1) {
    return {
      familyName: parts[0] ?? "",
      givenName: "",
    };
  }

  return {
    familyName: parts[parts.length - 1] ?? "",
    givenName: parts.slice(0, -1).join(" "),
  };
}

function getProfileDisplayName(profile: PersonProfile) {
  return profile.fullName.trim().split(/\s+/)[0] ?? profile.fullName;
}

export function getContactsByType(contacts: ContactLink[]): ContactValueMap {
  return contacts.reduce<ContactValueMap>((map, contact) => {
    map[contact.type] = contact;
    return map;
  }, {});
}

export function getContactByType(
  contacts: ContactLink[],
  type: ContactKind,
) {
  return contacts.find((contact) => contact.type === type);
}

export function getProfileUrl(profile: PersonProfile) {
  return profile.profileUrl;
}

export function getProfileQrCodeDescription(profile: PersonProfile) {
  const displayName = getProfileDisplayName(profile);
  const suffix = displayName.endsWith("s") ? "'" : "'s";
  return "Scan to open " + displayName + suffix + " digital profile.";
}

export function buildProfileQrCodeSvg(profile: PersonProfile) {
  return buildQrCodeSvg(getProfileUrl(profile));
}

export function buildVCard(profile: PersonProfile, companies: CompanyProfile[]) {
  const contactsByType = getContactsByType(profile.contacts);
  const email = contactsByType.email?.href.replace(/^mailto:/, "") ?? "";
  const phone = contactsByType.call?.href.replace(/^tel:/, "") ?? "";
  const organisations = companies.map((company) => company.name).join(", ");
  const urls = [contactsByType.explore?.href, contactsByType.linkedin?.href].filter(
    (value): value is string => Boolean(value),
  );
  const { familyName, givenName } = getNameParts(profile.fullName);

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:" + escapeVCardValue(profile.fullName),
    "N:" + escapeVCardValue(familyName) + ";" + escapeVCardValue(givenName) + ";;;",
    "TITLE:" + escapeVCardValue(profile.professionalTitle),
    organisations ? "ORG:" + escapeVCardValue(organisations) : "",
    email ? "EMAIL;TYPE=INTERNET:" + escapeVCardValue(email) : "",
    phone ? "TEL;TYPE=CELL:" + escapeVCardValue(phone) : "",
    ...urls.map((url) => "URL:" + escapeVCardValue(url)),
    "NOTE:" + escapeVCardValue("Datapex Connect digital identity"),
    "END:VCARD",
  ].filter(Boolean);

  return lines.join("\r\n");
}

export function buildVCardDownloadHref(
  profile: PersonProfile,
  companies: CompanyProfile[],
) {
  const vCard = buildVCard(profile, companies);
  return "data:text/vcard;charset=utf-8," + encodeURIComponent(vCard);
}

export function getVCardFileName(profile: PersonProfile) {
  return profile.slug + ".vcf";
}
