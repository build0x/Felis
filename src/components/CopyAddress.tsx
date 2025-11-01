"use client";

import { useState } from "react";
import clsx from "clsx";

type CopyAddressProps = {
  address: string;
  displayText?: string;
  copiedText?: string;
  variant?: "inline" | "pill";
  className?: string;
};

export function CopyAddress({
  address,
  displayText,
  copiedText = "已复制",
  variant = "inline",
  className,
}: CopyAddressProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch (error) {
      console.error("Copy address failed", error);
      setCopied(false);
    }
  };

  const content = copied ? copiedText : displayText ?? address;

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={clsx(
        variant === "inline"
          ? "font-mono text-white/80 underline decoration-dotted underline-offset-4"
          : "rounded-full border border-white/30 px-4 py-2 text-sm text-white/80 transition hover:border-white hover:text-white",
        className,
      )}
      aria-label={`复制地址 ${address}`}
    >
      {content}
    </button>
  );
}





