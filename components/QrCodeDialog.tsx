"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRightIcon,
  CopyIcon,
  QrCodeIcon,
  XIcon,
} from "@/components/LucideIcons";

type QrCodeDialogProps = {
  label: string;
  profileUrl: string;
  qrCodeSvg: string;
  description: string;
  tileClassName: string;
};

const iconClassName = "h-5 w-5 text-slate-700";
const tileIconClassName =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200/80";
const actionButtonClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium tracking-[-0.015em] text-slate-700 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2";

export function QrCodeDialog({
  label,
  profileUrl,
  qrCodeSvg,
  description,
  tileClassName,
}: QrCodeDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  }

  function openDialog() {
    setCopyState("idle");
    setIsOpen(true);
  }

  return (
    <>
      <button className={tileClassName} type="button" onClick={openDialog}>
        <span className={tileIconClassName}>
          <QrCodeIcon className={iconClassName} />
        </span>
        <div className="min-w-0 text-left">
          <p className="text-lg font-medium tracking-[-0.02em] text-slate-950 sm:text-[1.05rem]">
            {label}
          </p>
        </div>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/12 px-4 py-6 sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-label="Profile QR code"
        >
          <button
            type="button"
            aria-label="Close QR code"
            className="absolute inset-0 cursor-default"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative z-10 w-full max-w-md rounded-[2rem] bg-white p-6 shadow-[0_30px_80px_-44px_rgba(15,23,42,0.28)] ring-1 ring-slate-200 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  QR Code
                </p>
                <p className="text-base leading-7 text-slate-600 sm:text-[1.05rem]">
                  {description}
                </p>
              </div>
              <button
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 ring-1 ring-slate-200 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 rounded-[1.75rem] bg-white p-4 ring-1 ring-slate-200 sm:p-5">
              <div
                className="mx-auto max-w-[18rem] [&_svg]:block [&_svg]:h-auto [&_svg]:w-full"
                dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
              />
            </div>

            <div className="mt-5 space-y-4">
              <p className="break-all text-sm leading-6 text-slate-500">
                {profileUrl}
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  className={actionButtonClassName}
                  href={profileUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ArrowUpRightIcon className="h-4 w-4" />
                  Open profile
                </a>
                <button
                  className={actionButtonClassName}
                  type="button"
                  onClick={handleCopy}
                >
                  <CopyIcon className="h-4 w-4" />
                  {copyState === "copied"
                    ? "Link copied"
                    : copyState === "error"
                      ? "Copy unavailable"
                      : "Copy link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
