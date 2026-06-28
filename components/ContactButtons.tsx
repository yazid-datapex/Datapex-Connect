import {
  CompassIcon,
  ContactRoundIcon,
  MailIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "@/components/LucideIcons";
import { QrCodeDialog } from "@/components/QrCodeDialog";
import { getContactsByType } from "@/lib/digital-identity";
import type { ContactKind, ContactLink } from "@/types/content";

type ContactButtonsProps = {
  contacts: ContactLink[];
  saveContactHref: string;
  saveContactFileName: string;
  profileUrl: string;
  qrCodeSvg: string;
  qrCodeDescription: string;
};

type PrimaryContactType = Exclude<ContactKind, "linkedin">;

type LinkActionTile = {
  kind: PrimaryContactType | "save-contact";
  label: string;
  href: string;
  download?: string;
  external?: boolean;
};

const tileClassName =
  "flex min-h-[6.75rem] items-center gap-4 rounded-[1.85rem] bg-white px-5 py-5 text-left shadow-[0_18px_40px_-32px_rgba(15,23,42,0.2)] ring-1 ring-slate-200/80 sm:px-6 sm:py-6";

function getActions(
  contacts: ContactLink[],
  saveContactHref: string,
  saveContactFileName: string,
): LinkActionTile[] {
  const contactsByType = getContactsByType(contacts);
  const actions: LinkActionTile[] = [
    {
      kind: "save-contact",
      label: "Save Contact",
      href: saveContactHref,
      download: saveContactFileName,
    },
  ];

  if (contactsByType.explore) {
    actions.push({
      kind: "explore",
      label: contactsByType.explore.label,
      href: contactsByType.explore.href,
      external: true,
    });
  }

  if (contactsByType.email) {
    actions.push({
      kind: "email",
      label: contactsByType.email.label,
      href: contactsByType.email.href,
    });
  }

  if (contactsByType.whatsapp) {
    actions.push({
      kind: "whatsapp",
      label: contactsByType.whatsapp.label,
      href: contactsByType.whatsapp.href,
      external: true,
    });
  }

  if (contactsByType.call) {
    actions.push({
      kind: "call",
      label: contactsByType.call.label,
      href: contactsByType.call.href,
    });
  }

  return actions;
}

function getIcon(kind: LinkActionTile["kind"]) {
  const iconClassName = "h-5 w-5 text-slate-700";

  switch (kind) {
    case "call":
      return <PhoneIcon className={iconClassName} />;
    case "email":
      return <MailIcon className={iconClassName} />;
    case "whatsapp":
      return <MessageCircleIcon className={iconClassName} />;
    case "explore":
      return <CompassIcon className={iconClassName} />;
    case "save-contact":
      return <ContactRoundIcon className={iconClassName} />;
  }
}

function ActionTileLink({ action }: { action: LinkActionTile }) {
  return (
    <a
      className={tileClassName}
      href={action.href}
      download={action.download}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noreferrer" : undefined}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200/80">
        {getIcon(action.kind)}
      </span>
      <div className="min-w-0">
        <p className="text-lg font-medium tracking-[-0.02em] text-slate-950 sm:text-[1.05rem]">
          {action.label}
        </p>
      </div>
    </a>
  );
}

export function ContactButtons({
  contacts,
  saveContactHref,
  saveContactFileName,
  profileUrl,
  qrCodeSvg,
  qrCodeDescription,
}: ContactButtonsProps) {
  const [saveContactAction, ...otherActions] = getActions(
    contacts,
    saveContactHref,
    saveContactFileName,
  );

  return (
    <section className="space-y-5 sm:space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl lg:text-[2rem]">
          Let&apos;s Connect
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <ActionTileLink action={saveContactAction!} />
        <QrCodeDialog
          label="QR Code"
          profileUrl={profileUrl}
          qrCodeSvg={qrCodeSvg}
          description={qrCodeDescription}
          tileClassName={tileClassName}
        />
        {otherActions.map((action) => (
          <ActionTileLink key={action.kind} action={action} />
        ))}
      </div>
    </section>
  );
}
