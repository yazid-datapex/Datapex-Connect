import {
  ContactRoundIcon,
  MailIcon,
  MessageCircleIcon,
  PhoneIcon,
} from "@/components/LucideIcons";
import type { ContactKind, ContactLink } from "@/types/content";

type ContactButtonsProps = {
  contacts: ContactLink[];
};

type VisibleContactType = Exclude<ContactKind, "linkedin">;

type ActionTile = {
  kind: VisibleContactType | "save-contact";
  label: string;
  href?: string;
  external?: boolean;
};

const tileClassName =
  "flex min-h-[6.5rem] items-center gap-4 rounded-[1.85rem] bg-white px-5 py-5 text-left shadow-[0_18px_40px_-32px_rgba(15,23,42,0.2)] ring-1 ring-slate-200/80 sm:px-6 sm:py-6";

function getContactsByType(contacts: ContactLink[]) {
  return contacts.reduce<Partial<Record<VisibleContactType, ContactLink>>>(
    (map, contact) => {
      if (contact.type !== "linkedin") {
        map[contact.type] = contact;
      }

      return map;
    },
    {},
  );
}

function getActions(contacts: ContactLink[]): ActionTile[] {
  const contactsByType = getContactsByType(contacts);
  const actions: ActionTile[] = [
    {
      kind: "save-contact",
      label: "Save Contact",
    },
  ];

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

function getIcon(kind: ActionTile["kind"]) {
  const iconClassName = "h-5 w-5 text-slate-700";

  switch (kind) {
    case "call":
      return <PhoneIcon className={iconClassName} />;
    case "email":
      return <MailIcon className={iconClassName} />;
    case "whatsapp":
      return <MessageCircleIcon className={iconClassName} />;
    case "save-contact":
      return <ContactRoundIcon className={iconClassName} />;
  }
}

function ActionTile({ action }: { action: ActionTile }) {
  const content = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200/80">
        {getIcon(action.kind)}
      </span>
      <div className="min-w-0">
        <p className="text-lg font-medium tracking-[-0.02em] text-slate-950 sm:text-[1.05rem]">
          {action.label}
        </p>
      </div>
    </>
  );

  if (!action.href) {
    return (
      <div aria-disabled="true" className={tileClassName}>
        {content}
      </div>
    );
  }

  return (
    <a
      className={tileClassName}
      href={action.href}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noreferrer" : undefined}
    >
      {content}
    </a>
  );
}

export function ContactButtons({ contacts }: ContactButtonsProps) {
  const actions = getActions(contacts);

  return (
    <section className="space-y-5 sm:space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl lg:text-[2rem]">
          Let&apos;s Connect
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <ActionTile key={action.kind} action={action} />
        ))}
      </div>
    </section>
  );
}
